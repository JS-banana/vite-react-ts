import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';

import config from './config';

const env = process.argv[process.argv.length - 1];
const base = config[env]?.baseUrl || './';
console.log('env：', env);

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

export default defineConfig({
  base,
  plugins: [
    reactRefresh(),
    // 配置按需引入antd
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
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
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3001, // 开发环境启动的端口
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:8080/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 将 /api 重写为空
      },
    },
  },
});
