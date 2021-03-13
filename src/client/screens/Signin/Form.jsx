import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUserAction } from '@app/actions';
import { Form, Input, Button } from 'antd';

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      dispatch(signInUserAction(values));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
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
