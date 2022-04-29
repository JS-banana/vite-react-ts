// vite-plugin-imp、vite-plugin-style-import
// 两款按需加载都存在部分问题，目前先按照全局引入
// 引入 less 文件，使vite的配置可以替换主题
import 'antd/dist/antd.less';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// StrictMode 开启react严格模式
// 是因为Antd组件中有些使用了CSSTransition，但是CSSTransition中的部分代码的写法对于react而言，不是最新的写法，不是非常规范的写法，所以严格模式下的react就会抛出警告。但是这个实际并不影响使用，因为严格模式只会在开发模式下使用。在生产模式下就不会出现这样的警告了。

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
