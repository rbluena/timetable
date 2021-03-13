import { Form, Input, Button } from 'antd';

const Signin = () => (
  <Form layout="vertical">
    <Form.Item
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input size="large" placeholder="Enter your email" />
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
      <Input.Password size="large" placeholder="Create password" />
    </Form.Item>

    <Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        loading
        disabled
      >
        Sign Up
      </Button>
    </Form.Item>
  </Form>
);

export default Signin;
