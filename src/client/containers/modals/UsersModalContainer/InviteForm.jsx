import PropTypes from 'prop-types';
import { Button, Input, Form } from 'antd';

const InviteForm = ({ inviteUser }) => {
  const [form] = Form.useForm();

  /**
   * Inviting user to the group project.
   * @param {Object} values
   */
  function onSubmit(values) {
    inviteUser(values);
    form.resetFields();
  }

  return (
    <div className="flex justify-center p-0 m-0">
      <Form layout="inline" onFinish={onSubmit} form={form}>
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
          <Input placeholder="Email address" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Invite
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

InviteForm.propTypes = {
  inviteUser: PropTypes.func.isRequired,
};

export default InviteForm;
