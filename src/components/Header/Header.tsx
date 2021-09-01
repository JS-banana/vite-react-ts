import { Avatar, Dropdown, Layout, Menu, Space } from 'antd';
import React from 'react';

import logo from '../../assets/logo.jpg';
import useStore from '../../store';
import cls from './index.module.less';

const { Header } = Layout;

const MyHeader: React.FC = () => {
  const user = useStore((state) => state.user);

  const handleChange = (e: { key: string }) => {
    if (e.key === '0') {
      localStorage.removeItem('vite-react-ts-antd-token');
      window.location.href = '/user/login';
    }
  };

  const menu = (
    <Menu onClick={handleChange}>
      <Menu.Item key="0">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Header className={cls.layout_header}>
      <Dropdown overlay={menu}>
        <Space>
          <Avatar src={logo} />
          {user?.username}
        </Space>
      </Dropdown>
    </Header>
  );
};

export default MyHeader;
