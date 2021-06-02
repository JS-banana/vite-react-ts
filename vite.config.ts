import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
// @ts-ignore
// * No declaration file for less-vars-to-js
import lessToJS from 'less-vars-to-js';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

export default defineConfig({
  plugins: [
    reactRefresh(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
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
});
