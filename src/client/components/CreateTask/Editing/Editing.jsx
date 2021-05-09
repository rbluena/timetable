import { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Input, Button, Form, TimePicker, DatePicker, Select } from 'antd';

const { RangePicker } = TimePicker;
const { Option } = Select;

const Editing = ({
  task,
  categories,
  users,
  groups,
  cancelEditing,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  // console.log(task.userAssignees);
  // console.log(task.groupAssignees);

  useEffect(() => {
    if (task) {
      let assignees = [];

      if (task.userAssignees && task.userAssignees.length > 0) {
        assignees = task.userAssignees;
      }

      if (task.groupAssignees && task.groupAssignees.length > 0) {
        assignees = [...assignees, ...task.groupAssignees];
      }

      form.setFieldsValue({
        title: task.title,
        description: task.description,
        reporter: task.reporter ? task.reporter._id : null,
        category: task.category ? task.category : null,
        date: task.date ? moment(task.date) : null,
        range: task.schedule
          ? [moment(task.schedule.start), moment(task.schedule.end)]
          : null,
        assignees:
          assignees && assignees.length > 0
            ? assignees.map((item) => item._id)
            : [],
      });
    }
  }, [form, task]);

  /**
   * Mapping assignees
   * @param {Array} data Assignees
   */
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

  /**
   * Handling submitted data by user.
   * @param {Object} data
   */
  function handleFormSubmit(data) {
    if (task) {
      data._id = task._id;
      data.new = task.new;
      data.project = task.project;
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
  }

  return (
    <div
      className="overflow-y-auto py-4"
      style={{ height: 'calc(100vh - 80px)' }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
        onFinish={handleFormSubmit}
      >
        <div className="px-4">
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
              <Select
                style={{ width: '100%' }}
                placeholder="Category"
                allowClear
              >
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
            <Select
              style={{ width: '100%' }}
              placeholder="Reporter"
              showSearch
              allowClear
            >
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
              showSearch
              optionLabelProp="label"
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
        </div>

        {/* start: Footer submiting form */}
        <div className="flex justify-end fixed bottom-0 bg-neutral-50 border-b border-primary-100 w-full p-4">
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          &nbsp;
          <Button onClick={cancelEditing}>Cancel</Button>
        </div>
        {/* end: Footer submiting form */}
      </Form>
    </div>
  );
};

Editing.defaultProps = {
  categories: undefined,
  users: [],
  groups: [],
};

Editing.propTypes = {
  categories: PropTypes.objectOf(PropTypes.any),
  task: PropTypes.objectOf(PropTypes.any).isRequired,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  groups: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onSubmit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
};

export default Editing;
