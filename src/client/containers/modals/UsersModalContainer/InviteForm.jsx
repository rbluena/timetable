import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Avatar } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { findTeamUsersService } from '@app/services';

const InviteForm = ({ inviteUser, projectId }) => {
  const [usersList, setUsersList] = useState([]);
  const [form] = Form.useForm();

  /**
   * Inviting user to the group project.
   * @param {Object} values
   */
  function onSubmit(values) {
    inviteUser(values);
    form.resetFields();
  }

  async function onFindingUser(evt) {
    const { value } = evt.target;

    try {
      const { data } = await findTeamUsersService(projectId, value);
      setUsersList([...data]);
    } catch (error) {
      // console.log(error);
      // TODO: REPORT ERROR TO SENTRY
    }
  }

  const selectedUser = usersList && usersList.length > 0 ? usersList[0] : null;

  return (
    <div className="mx-auto p-0">
      <Form layout="inline" onFinish={onSubmit} form={form}>
        <div className="flex">
          <Avatar
            icon={<UserAddOutlined />}
            src={selectedUser && selectedUser.image.thumbnail}
            className="border border-neutral-400"
          />
          &nbsp;&nbsp;&nbsp;
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
            <Input
              placeholder="Email address"
              onFocus={onFindingUser}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {selectedUser ? 'Add' : 'Invite'}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <br />
      <pre>{JSON.stringify(usersList, null, 2)}</pre>
    </div>
  );
};

InviteForm.propTypes = {
  inviteUser: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default InviteForm;
