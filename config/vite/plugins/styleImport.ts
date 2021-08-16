// vite-plugin-imp 该插件按需加载存在部分样式丢失的情况
// import vitePluginImp from 'vite-plugin-imp';
// 由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
// 该插件存在样式覆盖问题，自己定义的样式会被覆盖
import styleImport from 'vite-plugin-style-import';

export default function configMockPlugin(isBuild: boolean) {
  if (!isBuild) return [];
  return styleImport({
    libs: [
      {
        libraryName: 'antd',
        esModule: true,
        resolveStyle: (name) => {
          return `antd/es/${name}/style/index`;
        },
      },
    ],
  });
}
