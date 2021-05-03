import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Form, Avatar, AutoComplete } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const InviteForm = ({ inviteUser, team }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [form] = Form.useForm();

  const teamOptions = team.map((item) => ({
    label: item.email,
    value: item.email,
  }));

  function onChange(value) {
    setSelectedUser(value);
  }

  function onSelect(data) {
    setSelectedUser(data);
  }

  const user =
    team && team.length > 0
      ? team.find((item) => item.email === selectedUser)
      : null;

  /**
   * Inviting user to the group project.
   * @param {Object} values
   */
  function onSubmit(data) {
    if (user) {
      // Selected user is part of project team.
      inviteUser({ ...data, type: 'member' });
    } else {
      // It is a new email being entered
      inviteUser({ ...data, type: 'new' });
    }
    form.resetFields();
    setSelectedUser('');
  }

  return (
    <div className="mx-auto p-0">
      <Form layout="inline" onFinish={onSubmit} form={form}>
        <div className="flex">
          <Avatar
            icon={<UserAddOutlined />}
            src={user && user.image && user.image.thumbnail}
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
            <AutoComplete
              options={teamOptions}
              allowClear
              filterOption
              onChange={onChange}
              onSelect={onSelect}
            >
              <Input size="large" placeholder="Enter email" />
            </AutoComplete>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {user ? 'Add' : 'Invite'}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <br />
      {/* <pre>{JSON.stringify(usersList, null, 2)}</pre> */}
    </div>
  );
};

InviteForm.defaultProps = {
  team: [],
};

InviteForm.propTypes = {
  inviteUser: PropTypes.func.isRequired,
  team: PropTypes.arrayOf(PropTypes.any),
};

export default InviteForm;
