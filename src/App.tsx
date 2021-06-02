import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { IRoute } from './routes';
import { layoutRouteList } from './routes/utils';

const App = () => {
  // console.log(layoutRouteList);
  return (
    <Suspense fallback={<Spin size="large" className="layout__loading" />}>
      <Router>
        <Switch>
          {layoutRouteList.map((route: IRoute) => (
            <Route key={route.path} path={route.path} component={route.component}></Route>
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
