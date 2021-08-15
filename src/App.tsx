import './global.less';

import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

const App = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router basename="/">
        <Switch>
          <Route path="/user" component={UserLayout}></Route>
          <Route path="/" component={BasicLayout}></Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
