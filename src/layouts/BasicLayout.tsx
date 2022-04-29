import { Layout } from 'antd';
import { createBrowserHistory } from 'history';
import React from 'react';
import { renderRoutes } from 'react-router-config';

import { IRouteConfig } from '@/routes/config';

import MyHeader from '../components/Header';
import MyMenu from '../components/Menu';

const { Content } = Layout;

const BasicLayout: React.FC<{ route: IRouteConfig }> = ({ route }) => {
  const history = createBrowserHistory();

  if (!localStorage.getItem('vite-react-ts-antd-token')) {
    history.push('/user/login');
  }

  return (
    <Layout>
      <MyMenu />
      <Layout>
        <MyHeader />
        <Content style={{ height: 'calc(100vh - 60px)' }}>
          {renderRoutes(route.routes)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
