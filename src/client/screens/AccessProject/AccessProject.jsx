import { useState } from 'react';
import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { accessProtectedProjectService } from '@app/services';

const AccessProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  // const dispatch = useDispatch();

  /**
   * Submit password to access a project
   * @param {Object} values
   */
  async function onSubmit(values) {
    try {
      setIsLoading(true);
      await accessProtectedProjectService(query.id, values);
      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      const { errors } = error;
      if (errors.description) {
        message.error(errors.description);
      }
    }
  }

  return (
    <div className="" style={{ minHeight: '250px' }}>
      <div className="max-w-sm pt-10 mx-auto">
        <p className="text-xl text-center text-neutral-500 pb-6">
          You need password to access this project.
        </p>
        <Form onFinish={onSubmit}>
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
            <Input.Password size="large" placeholder="Enter project password" />
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
              Access
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccessProject;
