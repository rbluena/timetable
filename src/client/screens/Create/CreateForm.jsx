import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, DatePicker } from 'antd';
import { createProjectAction } from '@app/actions';

const { RangePicker } = DatePicker;

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  /**
   * Creating project.
   * @param {Object} values
   */
  const onFinish = (values) => {
    setIsLoading(true);
    const data = { ...values };

    if (values.range) {
      data.startDate = values.range[0]._d;
      data.endDate = values.range[1]._d;
      delete data.range;
    }

    dispatch(createProjectAction(data));
    setIsLoading(false);
  };

  return (
    <div className="max-w-md p-4">
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item
          // name={['user', 'name']}
          name="title"
          rules={[{ required: true, message: 'Project name is required!' }]}
        >
          <Input placeholder="Project name" autoComplete="off" />
        </Form.Item>
        <Form.Item name="description">
          <Input.TextArea placeholder="Project description" rows={5} />
        </Form.Item>
        {/* <Form.Item name="accessModifier">
          <Radio.Group
            buttonStyle="solid"
            defaultValue="private"
            // onChange={(evt) => setProjectStatus(evt.target.value)}
          >
            <Radio.Button value="private">Private</Radio.Button>
            <Radio.Button value="protected">Protected</Radio.Button>
            <Radio.Button value="public">Public</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item
          name="range"
          // rules={[{ required: true, message: 'Project name is required!' }]}
        >
          <RangePicker format="MMM DD, YYYY" allowClear={false} />
        </Form.Item>
        {/* <Form.Item name={['user', 'email']} rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button
            size="large"
            block
            type="primary"
            htmlType="submit"
            ghost
            loading={isLoading}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateForm;
