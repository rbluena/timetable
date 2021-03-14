import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUserAction } from '@app/actions';
import { Form, Input, Button } from 'antd';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      dispatch(signUpUserAction({ ...values, type: 'local' }));
      setIsLoading(false);
      form.resetFields();
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <Form layout="vertical" onFinish={onSubmit} form={form}>
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input size="large" placeholder="Choose username" />
      </Form.Item>
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
        <Input size="large" placeholder="Enter email address" />
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
            message: 'Minimum characters for the password is 5.',
          },
        ]}
      >
        <Input.Password size="large" placeholder="Create password" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isLoading}
          // disabled={!isFormCopmpleted}
        >
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;