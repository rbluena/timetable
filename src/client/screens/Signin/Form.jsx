import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUserAction } from '@app/actions';
import { Form, Input, Button } from 'antd';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  function onSubmit(values) {
    setIsLoading(true);
    dispatch(signInUserAction(values));
    setIsLoading(false);
  }

  return (
    <Form className="w-72" layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="email"
        normalize={(value) => value.toLowerCase().trim()}
        rules={[
          {
            required: true,
            message: 'Email field should not be empty.',
          },
          {
            type: 'email',
            message: 'Please put a valid email address!',
          },
        ]}
      >
        <Input size="large" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            min: 5,
            message: 'Minimum length for the password is 5 characters.',
          },
        ]}
      >
        <Input.Password size="large" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isLoading}
        >
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signin;
