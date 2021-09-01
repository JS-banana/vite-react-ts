import './global.less';

import { Spin } from 'antd';
import React, { Suspense } from 'react';

// import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Authority from './layouts/Authority';
// import BasicLayout from './layouts/BasicLayout';
// import UserLayout from './layouts/UserLayout';

const App = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Authority></Authority>
    </Suspense>
  );
};

export default App;
