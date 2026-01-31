function downloadURI(uri, filename) {
  var link = document.createElement("a");
  link.target = "_blank";
  link.download = filename;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default class SnapshotControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList.add("mapboxgl-ctrl");
    this._container.classList.add("mapboxgl-ctrl-group");
    this._container.classList.add("mapboxgl-ctrl-download");

    const btn = document.createElement("button");
    btn.setAttribute("aria-label", "Download snapshot");
    btn.setAttribute("title", "Download snapshot");
    btn.style.lineHeight = "29px";
    btn.style.fontSize = "18px";

    const icon = document.createElement("span");
    icon.classList.add("mapboxgl-ctrl-icon");
    icon.setAttribute("aria-hidden", true);
    icon.textContent = "📷";
    btn.appendChild(icon);
    btn.addEventListener("click", this.download.bind(this));
    this._container.appendChild(btn);

    return this._container;
  }

  download() {
    this._map.once("render", () => {
      const link = document.createElement("a");
      link.target = "_blank";
      link.download = "map.png";
      this.prepareImage(this._map.getCanvas())
        .then((href) => {
          link.href = href;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error(err);
        });
    });
    this._map.triggerRepaint();
  }

  prepareImage(mapCanvas) {
    const dpr = window.devicePixelRatio;
    const canvas = document.createElement("canvas");
    canvas.width = mapCanvas.width;
    canvas.height = mapCanvas.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(mapCanvas, 0, 0);

    ctx.scale(dpr, dpr);

    const logo = this._map.getContainer().querySelector(".mapboxgl-ctrl-logo");
    const attrib = this._map
      .getContainer()
      .querySelector(".mapboxgl-ctrl-attrib");

    const mapWidth = mapCanvas.width / dpr;
    const mapHeight = mapCanvas.height / dpr;

    let renderLogo = Promise.resolve();
    if (logo) {
      const img = new Image();
      const imgHeight = 23;
      const imgWidth = 88;
      renderLogo = new Promise(function (resolve, reject) {
        img.onload = () => resolve(img);
        img.onerror = reject;
      }).then((img) => {
        if (!img) return;
        ctx.drawImage(img, 6, mapHeight - imgHeight - 6, imgWidth, imgHeight);
      });
      img.src = window
        .getComputedStyle(logo)
        .backgroundImage.replace(/^url\(['"]/, "")
        .replace(/['"]\)$/, "");
    }

    if (attrib) {
      const text = attrib.textContent.replace("Improve this map", "").trim();
      ctx.font = `${window.getComputedStyle(attrib).fontSize} ${
        window.getComputedStyle(attrib).fontFamily
      }`;
      const vpad = 3;
      const hpad = 5;
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      const size = ctx.measureText(text);
      const height = size.fontBoundingBoxAscent + size.fontBoundingBoxDescent;
      ctx.fillStyle = "rgb(255 255 255 / .5)";
      ctx.fillRect(
        mapWidth - size.width - 2 * hpad,
        mapHeight - height - 2 * vpad,
        size.width + 2 * hpad,
        height + 2 * vpad
      );
      ctx.fillStyle = "black";
      ctx.fillText(
        text,
        mapWidth - hpad,
        mapHeight - size.fontBoundingBoxDescent - vpad
      );
    }

    return renderLogo.then(() => canvas.toDataURL());
  }

  onRemove() {
    this._container.remove();
  }
}
