import PropTypes from 'prop-types';
import { Input, Button, Form, TimePicker, DatePicker, Select } from 'antd';
import { ControlWrapper } from '@app/components/Form';
// import { RichEditor } from '@app/components';

const { RangePicker } = TimePicker;
const { Option } = Select;

const CreateTask = ({ isOpen, closeModal, onSubmit }) => (
  <div
    className={` transform transition-all duration-200 bg-white w-full max-w-lg left-4 top-4 fixed rounded shadow-lg border border-neutral-50 overflow-x-hidden ${
      isOpen
        ? 'opacity-100 translate-x-0'
        : 'invisible opacity-0  translate-x-5'
    }`}
    style={{ maxHeight: 'calc(100vh - 80px)', zIndex: '1000' }}
  >
    <div className="bg-neutral-100">
      <h2 className="text-xl text-neutral-500 p-2 px-4">Task</h2>
    </div>

    <div className="max-w-2xl p-4">
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="title"
          rules={[
            {
              required: true,
              message: 'This field cannot be empty.',
            },
          ]}
        >
          <Input placeholder="Add title" />
        </Form.Item>

        <div className="flex items-center justify-start">
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: 'This field cannot be empty.',
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="range"
            rules={[
              {
                required: true,
                message: 'This field cannot be empty.',
              },
            ]}
          >
            <RangePicker minuteStep={5} format="HH:mm" />
          </Form.Item>
        </div>

        <Form.Item name="category">
          <Select style={{ width: 120 }} placeholder="Category">
            <Option value="physics">Physics</Option>
            <Option value="chemistry">Chemistry</Option>
            <Option value="Geography">Geography</Option>
          </Select>
        </Form.Item>

        <Form.Item name="assignees">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Assignee"
            // defaultValue={['rabii']}
            showSearch
            optionLabelProp="label"
          >
            <Option value="kelvin" label="Kelvin">
              Kelvin
            </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          {/* <RichEditor
              value={description}
              onChange={(data) => setDescription(data)}
            /> */}
        </Form.Item>

        {/* start: Footer */}
        <div className="flex justify-end">
          <ControlWrapper>
            <Button htmlType="reset" onClick={closeModal}>
              Cancel
            </Button>
            &nbsp;
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </ControlWrapper>
        </div>
        {/* end: Footer */}
      </Form>
    </div>
  </div>
);

CreateTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateTask;
