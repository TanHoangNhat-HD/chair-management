import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { login, LoginPayload } from '../authSlice';
import style from './LoginPage.module.scss';

export default function LoginPage() {
  const { handleSubmit, control } = useForm<LoginPayload>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<LoginPayload> = (values) => {
    dispatch(login(values));
  };

  return (
    <div className={style.login__container}>
      <Form
        onFinish={handleSubmit(onSubmit)}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
