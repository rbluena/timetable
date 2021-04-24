import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { requestVerificationTokenAction } from '@app/actions';

const VerificationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * Sumitting email for verification
   * @param {Object} values
   */
  async function onSubmit(values) {
    try {
      setIsLoading(true);
      dispatch(requestVerificationTokenAction(values));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-7xl p-2" style={{ minHeight: '500px' }}>
      <div className="max-w-sm pt-10 mx-auto">
        <p className="text-xl text-center text-neutral-500 pb-6">
          If verification failed you can request a new token.
        </p>
        <Form onSubmit={onSubmit}>
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={isLoading}
              // disabled={!isFormCopmpleted}
            >
              Request new token
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerificationPage;
