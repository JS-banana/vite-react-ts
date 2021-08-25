import './global.less';

import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Authority from './layouts/Authority';
import BasicLayout from './layouts/BasicLayout';
import UserLayout from './layouts/UserLayout';

const App = () => {
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router>
        <Switch>
          <Route exact path="/" component={Authority}></Route>
          <Route path="/user" component={UserLayout}></Route>
          <Route path="/home" component={BasicLayout}></Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
