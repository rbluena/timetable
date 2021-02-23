import { useState } from 'react';
import { Input, Button, Form, TimePicker, DatePicker, Select } from 'antd';
import { RichEditor } from '@app/components';

import { ControlWrapper } from '@app/components/Form';

const { RangePicker } = TimePicker;
const { Option } = Select;

const mockData = [];
for (let i = 0; i < 20; i += 1) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const initialTargetKeys = mockData
  .filter((item) => +item.key > 10)
  .map((item) => item.key);

const CreateTask = () => {
  const [description, setDescription] = useState('');
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  function onSubmit(values) {
    const data = { ...values, description };
  }

  return (
    <div
      className="bg-white w-full max-w-lg left-4 top-4 fixed hidden rounded shadow-lg border border-neutral-50 overflow-x-hidden"
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
              <DatePicker
                // value={date}
                format="DD-MM-YYYY"
              />
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
              <RangePicker
                minuteStep={5}
                format="HH:mm"
                // value={time}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Select
              name="category"
              defaultValue="chemistry"
              style={{ width: 120 }}
              placeholder="Select category"
              // onChange={handleChange}
            >
              <Option>Category</Option>
              <Option value="physics">Physics</Option>
              <Option value="chemistry">Chemistry</Option>
              <Option value="Geography">Geography</Option>
            </Select>
          </Form.Item>

          <Form.Item name="assignees">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Assign users"
              defaultValue={['rabii']}
              showSearch
              // onChange={handleChange}
              optionLabelProp="label"
            >
              <Option value="kelvin" label="Kelvin">
                Kelvin
              </Option>
              <Option value="rabii" label="Rabii">
                Rabii
              </Option>
              <Option value="rafiki" label="Rafiki">
                Rafik
              </Option>
              <Option value="aunty" label="Aunty">
                Aunty
              </Option>
            </Select>
          </Form.Item>

          {/* <Form.Item>
            <Transfer
              dataSource={mockData}
              titles={['Members', 'Assignees']}
              showSearch
              showSelectAll
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              operations={['Add', 'Remove']}
              // onChange={onChange}
              // onSelectChange={onSelectChange}
              // onScroll={onScroll}
              render={(item) => item.title}
            />
          </Form.Item> */}

          <Form.Item>
            <RichEditor
              value={description}
              onChange={(data) => setDescription(data)}
            />
          </Form.Item>

          {/* start: Footer */}
          <div className="flex justify-end">
            <ControlWrapper>
              <Button htmlType="button">Cancel</Button>
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
};

export default CreateTask;
