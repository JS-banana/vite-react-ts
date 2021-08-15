import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import path from 'path';
// 包依赖分析 https://github.com/btd/rollup-plugin-visualizer
import { visualizer } from 'rollup-plugin-visualizer';
import type { ConfigEnv, UserConfig } from 'vite';
// gzip压缩 https://github.com/anncwb/vite-plugin-compression
import viteCompression from 'vite-plugin-compression';

// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// import vitePluginImp from 'vite-plugin-imp';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
// 该插件存在样式覆盖问题，自己定义的样式会被覆盖
// import styleImport from 'vite-plugin-style-import';
// import config from './config';
import { ANALYZE, COMPRESS_GZIP, HTTP_API, PORT } from './config/constant';

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'),
);

// 函数式配置
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  console.log({ command, mode });

  return {
    // base: config[mode].baseUrl,
    base: '/',
    plugins: [
      // reactRefresh
      reactRefresh(),
      // vitePluginImp({
      //   libList: [
      //     {
      //       libName: 'antd',
      //       style(name) {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
      // styleImport
      // styleImport({
      //   libs: [
      //     {
      //       libraryName: 'antd',
      //       esModule: true,
      //       resolveStyle: (name) => {
      //         return `antd/es/${name}/style/index`;
      //       },
      //     },
      //   ],
      // }),
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
        { find: '@c', replacement: path.resolve(__dirname, 'config') },
      ],
      // alias: {
      //   '~': path.resolve(__dirname, './'),
      //   '@': path.resolve(__dirname, 'src'),
      // },
    },
    server: {
      port: PORT, // 开发环境启动的端口
      proxy: {
        '/api': {
          // 当遇到 /api 路径时，将其转换成 target 的值
          target: HTTP_API,
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
