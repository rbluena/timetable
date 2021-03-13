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
        loading
        disabled
      >
        Sign In
      </Button>
    </Form.Item>
  </Form>
);

export default Signin;
