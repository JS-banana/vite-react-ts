import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// import 'antd/lib/style/index.css'; // 已启动按需加载

// StrictMode 开启react严格模式

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
