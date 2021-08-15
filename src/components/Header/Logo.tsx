import { Avatar } from 'antd';
import React from 'react';

import logo from '@/assets/logo.jpg';

const Logo: React.FC<{ size: number }> = ({ size = 120 }) => (
  <Avatar size={size} src={logo} />
);

export default Logo;
