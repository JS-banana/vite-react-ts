import React from 'react';

import Page404 from '../pages/404';
import Home from '../pages/Home';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}

export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: '/user',
    component: React.lazy(() => import('../layouts/UserLayout')),
    meta: {
      title: '用户路由',
    },
    redirect: '/user/login',
    children: [],
  },
  {
    path: '/',
    component: React.lazy(() => import('../layouts/BasicLayout')),
    meta: {
      title: '系统路由',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        meta: {
          title: '首页',
          icon: 'home',
        },
        component: <Home />,
      },
      {
        path: '/login',
        component: <Login />,
        meta: {
          title: '登录',
        },
      },
      {
        path: '/register',
        component: <Register />,
        meta: {
          title: '注册',
        },
      },
      {
        path: '/error',
        meta: {
          title: '页面不存在',
        },
        component: <Page404 />,
      },
      {
        path: '/*',
        meta: {
          title: '错误页面',
        },
        redirect: '/error/404',
      },
    ],
  },
];

export default routes;
