import { Config } from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";

export const config: Config = {
  globalStyle: "src/example-styling.css", // Used for tutorial example only
  namespace: "CodeHighlighter",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      // Generate docs for components
      type: "docs-readme"
    },
    {
      type: "www",
      // Don't create a service worker
      serviceWorker: null
    }
  ],
  // Allow node built-ins to be imported (for Rollup)
  plugins: [nodePolyfills()]
};
