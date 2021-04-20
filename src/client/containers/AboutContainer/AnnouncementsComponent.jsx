import { useState } from 'react';
import PropTypes from 'prop-types';
import { Mentions, Affix, Badge, Form, Button, Select, Typography } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { uniq } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { encode } from 'html-entities';
import { createNotificationAction } from '@app/actions';
import { announcementsSelector } from '@app/selectors';
import AnnouncementMessage from './AnnouncementMessage';

const { Title } = Typography;

const AnnouncementsComponent = ({
  projectId,
  title = 'Announcements',
  isUserOwner,
  updateProject,
  groups,
  team,
}) => {
  const [mentions, setMentions] = useState([]);
  const dispatch = useDispatch();
  const announcements = useSelector(announcementsSelector);
  const [form] = Form.useForm();

  /**
   * Sending notification message
   * @param {Object} data
   */
  async function onSubmit(data) {
    try {
      data.body = data.body.split(' ').map((text) => {
        if (text.startsWith('@')) {
          return `<span class="text-secondary-400 font-normal inline-block">${text}</span>`;
        }

        if (text.startsWith('#')) {
          return `<span class="text-primary-400 font-normal inline-block">${text}</span>`;
        }

        if (text.startsWith('http' || 'https' || 'www')) {
          return `<a href=${text} class="text-primary-600 font-normal inline-block">${text}</a>`;
        }

        return text;
      });

      const notification = {
        project: projectId,
        recepient: JSON.parse(data.recepient),
        body: encode(data.body.join(' ')),
        mentions: uniq(mentions),
        type: 'message',
      };

      dispatch(createNotificationAction(projectId, notification));
      form.resetFields();
    } catch (error) {
      // TODO: ERROR HANDLING
    }
  }

  function onMentionSelected(data) {
    setMentions((state) => [...state, data.key]);
  }

  return (
    <Affix className="">
      <div className="w-full md:w-72 md:ml-6 space-y-1">
        <div
          className="bg-white w-full shadow mr-auto rounded-md p-4 my-6 md:pl-4  md:my-0 relative"
          style={{ maxHeight: '350px' }}
        >
          <div className="flex items-center">
            <Title
              level={5}
              editable={
                isUserOwner
                  ? {
                      onChange: (value) =>
                        updateProject('settings.announcements.name', value),
                    }
                  : false
              }
            >
              <span className="text-neutral-400 font-bold ">{title}</span>
            </Title>
            <div className="ml-auto">
              <Badge dot>
                <NotificationOutlined />
              </Badge>
            </div>
          </div>
          <div
            className="overflow-y-auto py-2 divide-y divide-neutral-100 space-y-4"
            style={{ maxHeight: '280px' }}
          >
            {announcements &&
              announcements.length > 0 &&
              announcements.map((message) => (
                <AnnouncementMessage
                  key={message._id}
                  message={message}
                  isUserOwner={isUserOwner}
                />
              ))}
          </div>
        </div>
        <div className="">
          <Form onFinish={onSubmit} form={form}>
            <Form.Item
              name="recepient"
              rules={[
                {
                  required: true,
                  message: 'This should not be empty!',
                },
              ]}
              className="p-0 m-0"
            >
              <Select placeholder="to:" className="w-full">
                <Select.Option
                  label="Everyone"
                  value={JSON.stringify({ type: 'all', name: 'All', id: null })}
                >
                  Everyone
                </Select.Option>

                {team && team.length > 0 && (
                  <Select.OptGroup label="Users">
                    {team.map((user) => (
                      <Select.Option
                        key={user._id}
                        value={JSON.stringify({
                          type: 'user',
                          id: user._id,
                          name: user.fullName,
                        })}
                        label={user.fullName}
                      >
                        {user.fullName}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                )}

                {groups && groups.length > 0 && (
                  <Select.OptGroup label="Groups">
                    {groups.map((group) => (
                      <Select.Option
                        key={group._id}
                        value={JSON.stringify({
                          type: 'group',
                          id: group._id,
                          name: group.name,
                        })}
                        label={group.name}
                      >
                        {group.name}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="body"
              rules={[
                {
                  required: true,
                  message: 'Message should not be empty!',
                },
              ]}
              className="p-0 m-0"
            >
              <Mentions
                placeholder="Say something...!"
                // style={{ height: '65px' }}
                rows="4"
                className="shadow"
                onSelect={onMentionSelected}
              >
                {groups &&
                  groups.length > 0 &&
                  groups.map((group) => (
                    <Mentions.Option
                      value={group.name.replace(/\s+/g, '')}
                      key={`group-${group._id}`}
                    >
                      {group.name}
                    </Mentions.Option>
                  ))}

                {team &&
                  team.length > 0 &&
                  team.map((user) => (
                    <Mentions.Option
                      value={user.userName ? user.userName : user.email}
                      key={`user-${user._id}`}
                    >
                      {user.fullName}
                    </Mentions.Option>
                  ))}
              </Mentions>
            </Form.Item>
            <Button htmlType="submit" type="primary" ghost>
              Send
            </Button>
          </Form>
        </div>
      </div>
    </Affix>
  );
};

AnnouncementsComponent.defaultProps = {
  isUserOwner: false,
  title: 'Announcements',
  groups: [],
  team: [],
};

AnnouncementsComponent.propTypes = {
  isUserOwner: PropTypes.bool,
  title: PropTypes.string,
  projectId: PropTypes.string.isRequired,
  updateProject: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  team: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
};

export default AnnouncementsComponent;
