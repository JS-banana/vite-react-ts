import React from 'react';
import { Redirect } from 'react-router-dom';

import useStore from '../store';

const Authority: React.FC = ({ children }) => {
  const user = useStore((state) => state.user);
  console.log('Authority', user);

  if (!user) {
    return <Redirect to="/user/login" />;
  }

  return <>{children}</>;
};

export default Authority;
