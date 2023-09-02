import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript"
import license from "rollup-plugin-license"
import progress from "rollup-plugin-progress"
import pkg from "./package.json"

export default [
  // browser-friendly UMD build
  {
    input: "src/main.ts",
    output: {
      name: "SVGTextAnimate",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      tsConfigPaths(),
      license({
        banner:
          "https://github.com/oubenruing/svg-text-animate | (c) oubenruing 2019 | MIT License ",
      }),
      progress({
        clearLine: false, // default: true
      }),
    ],
  },
  {
    input: "src/main.ts",
    external: [],
    plugins: [
      typescript(),
      tsConfigPaths(),
      license({
        banner:
          "https://github.com/oubenruing/svg-text-animate | (c) oubenruing 2019 | MIT License ",
      }),
      progress({
        clearLine: false, // default: true
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    watch: {
      include: "src/**",
    },
  },
]
