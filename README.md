# notebooks

My Observable notebooks, in one place.

```bash
npm start
npm run build
```

Beware, this library uses a non-standard modification to `@observablehq/notebook-kit` which I've linked locally. You can find it at [@rreusser/notebook-kit](https://github.com/observablehq/notebook-kit/compare/main...rreusser:notebook-kit:transform-template?expand=1). The short of it is that I wanted to be able to pull notebook content like the title out into the surrounding template, and to pull surrounding content like the date into the notebook. I don't know that I've chosen a good solution, but it does work. 

## License

&copy; 2025 Ricky Reusser. MIT License.
