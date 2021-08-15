// vite-plugin-imp、vite-plugin-style-import
// 两款按需加载都存在部分问题，目前先按照全局引入
// 引入 less 文件，使vite的配置可以替换主题
import 'antd/dist/antd.less';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// StrictMode 开启react严格模式

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
