import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import tsConfigPaths from "rollup-plugin-tsconfig-paths"
import progress from "rollup-plugin-progress"
import terser from "@rollup/plugin-terser"
import { readFile } from "fs/promises"
import clear from "rollup-plugin-clear"
import { dts } from "rollup-plugin-dts"

const mode = process.env.MODE
const isProd = mode === "prod"
const packageJson = JSON.parse(
  await readFile(new URL("./package.json", import.meta.url))
)
const deps = {
  ...(packageJson?.dependencies || {}),
}
export default [
  {
    input: "src/main.ts",
    external: [...Object.keys(deps)],
    output: [
      {
        name: "SVGTextAnimate",
        file: packageJson.browser,
        sourcemap: !isProd,
        format: "umd",
      },
      { file: packageJson.module, sourcemap: !isProd, format: "es" },
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      tsConfigPaths(),
      progress({
        clearLine: false,
      }),
      isProd && terser(),
      isProd &&
        clear({
          targets: ["dist"],
        }),
    ],
    watch: {
      include: "src/**",
    },
  },
  {
    input: "src/main.ts",
    output: [{ file: packageJson.types, format: "es" }],
    plugins: [dts()],
    watch: {
      include: "src/**",
    },
  },
]
