import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// import vitePluginImp from 'vite-plugin-imp';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
import styleImport from 'vite-plugin-style-import';
import lessToJS from 'less-vars-to-js';
import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
// 读取.env环境变量，并输出对象类型
import { loadEnv } from 'vite';
// 包依赖分析 https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';
// gzip压缩 https://github.com/anncwb/vite-plugin-compression
import viteCompression from 'vite-plugin-compression';

import config from './config';
import { ANALYZE, COMPRESS_GZIP } from './config/constant';

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

// 函数式配置
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // 拿到的值是 string 类型
  const { VITE_PORT, VITE_HTTP_API } = env;

  console.log('env', env);
  console.log('command', command);
  console.log('mode', mode);

  return {
    base: config[mode].baseUrl,
    plugins: [
      // reactRefresh
      reactRefresh(),
      // styleImport
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
      // legacy
      mode === 'legacy' &&
        legacy({
          targets: ['ie >= 11'],
          additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
      // ANALYZE
      ANALYZE &&
        visualizer({
          filename: './node_modules/.cache/visualizer/stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      // COMPRESS_GZIP
      COMPRESS_GZIP && isBuild && viteCompression({ deleteOriginFile: false }),
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
      port: Number(VITE_PORT), // 开发环境启动的端口
      proxy: {
        '/api': {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: VITE_HTTP_API,
          changeOrigin: true,
          rewrite: (pre) => pre.replace(/^\/api/, ''), // 将 /api 重写为空
        },
      },
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: isBuild,
        },
      },
    },
  };
};
