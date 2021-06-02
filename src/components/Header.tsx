import { Space } from 'antd';
import React from 'react';

import useStore from '../store';

const Header: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <Space style={{ color: 'white' }}>
      <strong>Header</strong>
      <span>
        user：<em>{user}</em>
      </span>
    </Space>
  );
};
export default Header;
