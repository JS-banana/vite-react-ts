import { Avatar, Layout } from 'antd';
import React from 'react';

import logo from '../../assets/logo.jpg';
import useStore from '../../store';
import cls from './index.module.less';

const { Header } = Layout;

const MyHeader: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <Header className={cls.layout_header}>
      <Avatar src={logo} />
      {user}
    </Header>
  );
};

export default MyHeader;
