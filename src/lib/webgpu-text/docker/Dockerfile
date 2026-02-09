# Dockerfile for msdf-atlas-gen
# Builds the msdf-atlas-gen tool from source for generating MSDF font atlases
#
# Usage:
#   docker build -t msdf-atlas-gen ./docker
#   docker run --rm -v $(pwd)/fonts:/fonts -v $(pwd)/output:/output msdf-atlas-gen \
#     -font /fonts/MyFont.ttf -o /output/atlas

FROM ubuntu:22.04 AS builder

# Avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libfreetype-dev \
    libpng-dev \
    libtinyxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Clone and build msdf-atlas-gen with submodules
WORKDIR /build
RUN git clone --recursive https://github.com/Chlumsky/msdf-atlas-gen.git

WORKDIR /build/msdf-atlas-gen
RUN cmake -B build -DCMAKE_BUILD_TYPE=Release \
    -DMSDF_ATLAS_BUILD_STANDALONE=ON \
    -DMSDF_ATLAS_USE_VCPKG=OFF \
    -DMSDF_ATLAS_USE_SKIA=OFF \
    && cmake --build build --config Release -j$(nproc)

# Runtime image
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libfreetype6 \
    libpng16-16 \
    libtinyxml2-9 \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Copy the built binary
COPY --from=builder /build/msdf-atlas-gen/build/bin/msdf-atlas-gen /usr/local/bin/

# Copy the entry point script
COPY generate-atlas.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/generate-atlas.sh

# Set working directory
WORKDIR /work

# Default entry point
ENTRYPOINT ["/usr/local/bin/generate-atlas.sh"]
