import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useAuth } from 'hooks';
import { LoginPayload } from 'models';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import style from './LoginPage.module.scss';

export default function LoginPage() {
  const { handleSubmit, control } = useForm<LoginPayload>();
  const { login, token, logout, user } = useAuth();

  const onLogin: SubmitHandler<LoginPayload> = (values) => {
    login(values);
  };

  return (
    <div className={style.login__container}>
      {token ? (
        <div className={style.login__noti}>
          <h2>
            Hi <Link to="/admin">{user?.name}</Link>{' '}
          </h2>
          <h2>You already login!!!</h2>
          <span>Now you can </span>
          <Button type="primary">
            <Link to="/admin">go to Admin page</Link>
          </Button>
          <span> or </span>
          <Button type="primary" danger onClick={logout}>
            logging out ...
          </Button>
        </div>
      ) : (
        <Form
          onFinish={handleSubmit(onLogin)}
          className={style.login__form}
          wrapperCol={{ span: 30 }}
          autoComplete="off"
        >
          <Typography.Title className={style.login__title} level={2}>
            Login
          </Typography.Title>

          <Form.Item rules={[{ required: true, message: 'Please input your username!' }]}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input prefix={<UserOutlined />} placeholder="Username" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item rules={[{ required: true, message: 'Please input your password!' }]}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password prefix={<LockOutlined />} placeholder="Password" {...field} />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
