import { Button, Card, Form, Input } from 'antd';
import React from 'react';

import useStore from '../../store';

const Login: React.FC = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  function a() {
    ('123');
    // console.log(a);
  }
  a();

  return (
    <div>
      <h2> Login </h2>
      <div>change this user name</div>
      <Card>
        <Form
          initialValues={{ name: user }}
          onFinish={(val) => {
            setUser(val.name);
          }}>
          <Form.Item label="名称" name="name">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
