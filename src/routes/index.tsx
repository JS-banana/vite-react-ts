import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

import routes, { IRouteConfig } from './config';

export interface RouteComponentConfig extends Omit<IRouteConfig, 'component' | 'routes'> {
  routes?: RouteComponentConfig[];
  component?: React.LazyExoticComponent<React.FC<Record<string, unknown>>>;
}

const DqRoutes: React.FC = () => {
  console.log(renderRoutes(routes));
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
};

export default DqRoutes;
