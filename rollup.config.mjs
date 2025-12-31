import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license';

const banner = 'https://github.com/oubenruing/svg-text-animate | (c) oubenruing 2019 | MIT License ';

const basePlugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: './dist/types',
    rootDir: './src'
  }),
  license({ banner })
];

export default [
  // 非压缩版本
  {
    input: 'src/svg-text-animate.ts',
    output: [
      {
        file: 'dist/svg-text-animate.js',
        format: 'iife',
        name: 'SVGTextAnimate',
        sourcemap: true
      },
      {
        file: 'dist/svg-text-animate.es.js',
        format: 'es',
        sourcemap: true
      },
    ],
    plugins: basePlugins,
    watch: {
      include: 'src/**'
    }
  },
  // 压缩版本
  {
    input: 'src/svg-text-animate.ts',
    output: [
      {
        file: 'dist/svg-text-animate.min.js',
        format: 'iife',
        name: 'SVGTextAnimate',
        sourcemap: false
      },
      {
        file: 'dist/svg-text-animate.es.min.js',
        format: 'es',
        sourcemap: false
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        declarationDir: undefined,
        rootDir: './src'
      }),
      terser({
        compress: true,
        mangle: true
      }),
      license({ banner })
    ]
  }
];
