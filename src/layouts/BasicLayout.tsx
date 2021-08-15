import { Layout, Spin } from 'antd';
import React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';

import MyHeader from '../components/Header';
import MyMenu from '../components/Menu';
import useStore from '../store';

const { Content } = Layout;

const Home = React.lazy(() => import('../pages/Home'));

const BasicLayout: React.FC<RouteComponentProps> = () => {
  const loading = useStore((state) => state.loading);

  return (
    <Layout>
      <MyMenu />
      <Layout>
        <MyHeader />
        <Content style={{ height: 'calc(100vh - 60px)' }}>
          <Spin spinning={loading}>
            <Switch>
              <Route key="home" path="/home" component={Home} />
            </Switch>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(BasicLayout);
