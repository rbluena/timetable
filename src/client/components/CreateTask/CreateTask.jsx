import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, TimePicker, DatePicker, Select } from 'antd';
import { ControlWrapper } from '@app/components/Form';
import moment from 'moment';
import { isEmpty } from 'lodash';

const { RangePicker } = TimePicker;
const { Option } = Select;

const CreateTask = ({
  isOpen,
  closeModal,
  onSubmit,
  editingTask,
  categories,
  assignees,
}) => {
  const [form] = Form.useForm();

  const { users, groups } = assignees;

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        date: editingTask.date ? moment(editingTask.date) : null,
        description: editingTask.description,
        reporter: editingTask.reporter ? editingTask.reporter : null,
        range: editingTask.schedule
          ? [
              moment(editingTask.schedule.start),
              moment(editingTask.schedule.end),
            ]
          : null,
        title: editingTask.title,
        category: editingTask.category ? editingTask.category._id : null,
        assignees: [],
      });
    }
  }, [form, editingTask]);

  function mapAssignees(data) {
    if (data && data.length) {
      return data.map((itemId) => {
        const item = [...users, ...groups].find(
          (dataItem) => dataItem._id === itemId
        );

        return {
          _id: item._id,
          type: item.email && !item.name ? 'user' : 'group',
        };
      });
    }

    return [];
  }

  function handleSubmittedData(data) {
    if (editingTask) {
      data._id = editingTask._id;
      data.updatingTask = true;
      data.project = editingTask.project;
    }

    data.date = data.date.format('YYYY-MM-DD');

    if (data.range) {
      // Scheduling task.
      const startTime = moment(data.range[0]).format('HH:mm');
      const endTime = moment(data.range[1]).format('HH:mm');

      data.startTime = moment(`${data.date} ${startTime}`)._d;
      data.endTime = moment(`${data.date} ${endTime}`)._d;

      data.schedule = {
        start: data.startTime,
        end: data.endTime,
      };
      data.date = data.startTime;
    } else {
      // Time was not scheduled
      data.date = moment(data.date)._d;
    }

    const mappedAssignees = mapAssignees(data.assignees);

    delete data.range;

    onSubmit({ ...data, assignees: mappedAssignees });
    form.resetFields();
  }

  return (
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
        <Form
          form={form}
          onFinish={handleSubmittedData}
          layout="vertical"
          initialValues={{}}
        >
          {/* start: Title */}
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'This field cannot be empty.',
              },
            ]}
          >
            <Input autoComplete="off" placeholder="Add title" />
          </Form.Item>
          {/* end: Title */}

          {/* start: Description */}
          <Form.Item name="description">
            <Input.TextArea placeholder="Task description" rows={4} />
          </Form.Item>
          {/* end: Description */}

          {/* start: Scheduling component */}
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
              <DatePicker format="DD-MM-YYYY" bordered={false} />
            </Form.Item>
            <Form.Item name="range">
              <RangePicker minuteStep={5} format="HH:mm" bordered={false} />
            </Form.Item>
          </div>
          {/* end: Scheduling component */}

          {/* start: Rendering categories */}
          {!isEmpty(categories) && (
            <Form.Item name="category">
              <Select style={{ width: 120 }} placeholder="Category">
                {Object.keys(categories).map((key) => {
                  const category = categories[key];

                  return (
                    <Option key={key} value={key}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {/* end: Rendering categories */}

          {/* start: Rendering reporter options */}
          <Form.Item name="reporter">
            <Select style={{ width: '100%' }} placeholder="Reporter" showSearch>
              {!isEmpty(users) &&
                users.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {user.fullName}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          {/* end: Rendering reporter options */}

          {/* start: Rendering assignees options */}
          <Form.Item name="assignees">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Assignees"
              // defaultValue={['rabii']}
              showSearch
              optionLabelProp="label"
              onChange={console.log}
            >
              {!isEmpty(users) && (
                <Select.OptGroup label="Users">
                  {users.map((user) => (
                    <Option
                      key={user._id}
                      value={user._id}
                      label={user.fullName}
                    >
                      {user.fullName}
                    </Option>
                  ))}
                </Select.OptGroup>
              )}

              {!isEmpty(groups) && (
                <Select.OptGroup label="Groups">
                  {groups.map((group) => (
                    <Option
                      key={group._id}
                      value={group._id}
                      label={group.name}
                    >
                      {group.name}
                    </Option>
                  ))}
                </Select.OptGroup>
              )}
            </Select>
          </Form.Item>
          {/* end: Rendering assignees options */}
          <h2>Attachments:</h2>

          {/* start: Footer */}
          <div className="flex justify-end">
            <ControlWrapper>
              <Button
                htmlType="reset"
                onClick={() => {
                  closeModal();
                  form.resetFields();
                }}
              >
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
};

CreateTask.defaultProps = {
  editingTask: null,
  assignees: undefined,
  categories: undefined,
};

CreateTask.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editingTask: PropTypes.objectOf(PropTypes.any),
  assignees: PropTypes.objectOf(PropTypes.any),
  categories: PropTypes.objectOf(PropTypes.any),
};

export default CreateTask;
