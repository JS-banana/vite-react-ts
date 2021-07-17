import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import path from 'path';
import { defineConfig } from 'vite';
// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// import vitePluginImp from 'vite-plugin-imp';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
import styleImport from 'vite-plugin-style-import';

import config from './config';

const env = process.argv[process.argv.length - 1];
const base = config[env]?.baseUrl || './';
console.log('process.argv', process.argv);
console.log('env：', env);
console.log('import.meta', import.meta);

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

export default defineConfig({
  base,
  plugins: [
    reactRefresh(),
    // 配置按需引入antd
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style/index.less`,
    //     },
    //   ],
    // }),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
    env === 'legacy' &&
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
  ].filter(Boolean),
  css: {
    // modules: {
    //   localsConvention: 'camelCaseOnly',
    // },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript，支持 less 内联 JS
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: themeVariables,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: path.resolve(__dirname, './') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
    // alias: {
    //   '~': path.resolve(__dirname, './'),
    //   '@': path.resolve(__dirname, 'src'),
    // },
  },
  server: {
    port: 3001, // 开发环境启动的端口
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: (pre) => pre.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
});
