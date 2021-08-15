import { Layout, Menu, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import useStore from '../../store';
import cls from './index.module.less';
const { Sider } = Layout;

const Header: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <Sider>
      <div className={cls.menu_logo}>
        <Typography.Title className={cls.logo_title} level={5}>
          Logo
        </Typography.Title>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {user?.menus.map((item) => (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
export default Header;
