import React from 'react';

import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Redirect from '@/pages/Redirect';
export interface IRouteConfig {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  exact?: boolean;
  // 路由信息
  title: string;
  icon?: string;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  routes?: IRouteConfig[];
}

const layouts: IRouteConfig[] = [
  {
    path: '/',
    title: '/',
    exact: true,
    component: Redirect,
  },
  {
    path: '/sys',
    component: BasicLayout,
    title: '系统路由',
    // exact: true,
    routes: [
      {
        path: '/sys/home',
        title: '首页',
        icon: 'home',
        component: React.lazy(() => import('@/pages/Home')),
      },
      {
        path: '/sys/about',
        title: '关于',
        icon: 'home',
        component: React.lazy(() => import('@/pages/About')),
      },
    ],
  },
  {
    path: '/user',
    component: UserLayout,
    title: '用户路由',
    redirect: '/user/login',
    routes: [
      {
        path: '/user/login',
        component: React.lazy(() => import('@/pages/User/Login')),
        title: '登录',
      },
      {
        path: '/user/register',
        component: 'pages/User/Register',
        title: '注册',
      },
    ],
  },
  {
    path: '/noFond',
    title: '页面不存在',
    component: React.lazy(() => import('@/pages/NoFond')),
  },
];

export default layouts;
