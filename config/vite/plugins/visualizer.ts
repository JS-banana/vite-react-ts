/**
 * 包依赖分析
 * https://github.com/btd/rollup-plugin-visualizer
 */
import visualizer from 'rollup-plugin-visualizer';

export default function configVisualizerConfig() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as Plugin;
}
