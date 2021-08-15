import { Layout, Typography } from 'antd';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Login = React.lazy(() => import('../pages/User/Login'));
const Page404 = React.lazy(() => import('../pages/404'));

const { Content, Footer } = Layout;
const { Text } = Typography;

const UserLayout: React.FC = () => {
  return (
    <Layout>
      <Content>
        <Switch>
          <Redirect exact from="/user" to="/user/login" />
          <Route exact path="/user/login" component={Login} />
          <Route component={Page404} />
        </Switch>
      </Content>
      <Footer>
        <Text>
          Vite2.0 + React + Antd <Text type="secondary">@JS-banana 2021</Text>
        </Text>
      </Footer>
    </Layout>
  );
};
export default UserLayout;
