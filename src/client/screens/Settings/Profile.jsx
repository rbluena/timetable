import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { athenticatedUserSelector, authTokenSelector } from '@app/selectors';
import { updateUserAction } from '@app/actions';
import { Form, Input, Button } from 'antd';
import ProfileUpload from './ProfileUpload';

const Profile = () => {
  const [changePassword, setChangePassword] = useState(false);
  const userData = useSelector(athenticatedUserSelector);
  const token = useSelector(authTokenSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  function onSubmit(data) {
    dispatch(updateUserAction({ _id: userData._id, ...data }));
  }

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        fullName: userData.fullName,
        accountName: userData.accountName,
        email: userData.email,
        userName: userData.userName,
      });
    }
  }, [form, userData]);

  return (
    <div className="flex flex-wrap-reverse md:flex-row py-4">
      <Form className="w-72" layout="vertical" onFinish={onSubmit} form={form}>
        <Form.Item
          name="fullName"
          label="Full name:"
          rules={[
            {
              required: true,
              message: 'Please input your full name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="accountName"
          label="Account name"
          rules={[
            {
              required: true,
              message: 'Please input your account name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="userName"
          label="Username:"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email:"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Button
            type="link"
            onClick={() => setChangePassword(!changePassword)}
          >
            Change password
          </Button>
        </Form.Item>

        {changePassword && (
          <div>
            <Form.Item name="oldPassword" label="Old password:">
              <Input.Password />
            </Form.Item>
            <Form.Item name="password" label="New password:">
              <Input.Password />
            </Form.Item>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            // disabled={!isFormCopmpleted}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* start: Adding profile image */}
      <div className="pl-8">
        <ProfileUpload token={token} user={userData} />
      </div>
      {/* end: Adding profile image */}
    </div>
  );
};

export default Profile;
