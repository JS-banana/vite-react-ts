import dayjs from 'dayjs';
import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';

import { PORT, VITE_BASE_PATH, VITE_DROP_CONSOLE } from './config/constant';
import { themeVariables } from './config/theme';
import { createVitePlugins } from './config/vite/plugins';
import { createProxy } from './config/vite/proxy';
import pkg from './package.json';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};

// 函数式配置
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';

  console.log({ command, mode });

  return {
    base: VITE_BASE_PATH,
    plugins: createVitePlugins(mode, isBuild),
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
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
    },
    server: {
      host: true,
      port: PORT, // 开发环境启动的端口
      proxy: createProxy(),
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
    },
    define: {
      // 设置应用信息
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
};
