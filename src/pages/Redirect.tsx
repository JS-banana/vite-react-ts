import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectPage: React.FC = () => {
  return <Redirect to="/sys/home" />;
};
export default RedirectPage;
