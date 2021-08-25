/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export default function configMockPlugin(isBuild: boolean) {
  console.log('isBuild', isBuild);
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';

       setupProdMockServer();
       `,
  });
}
