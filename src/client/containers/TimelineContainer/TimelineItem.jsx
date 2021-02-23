import { Timeline, Button, Typography, Avatar, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const TimelineItem = () => (
  <Timeline.Item color="blue">
    <div>
      <div className="flex flex-wrap">
        <p className="text-primary-500 font-bold">11:00am - 12:35am</p>
      </div>

      <Text strong>Newton&apos; law of motion.</Text>
    </div>
    <Paragraph type="secondary" className="mt-2">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
      recusandae fugit vel placeat voluptatibus labore nulla dolores ut
      consequuntur facere. Distinctio neque nesciunt velit maiores reprehenderit
      iusto ipsam ullam repudiandae.
    </Paragraph>

    <div className="py-2 pb-4">
      <Avatar.Group
        maxCount={2}
        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: '#1890ff' }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </div>
    <div className="pb-4 flex justify-between items-center">
      <Button type="primary" size="small" ghost>
        Details
      </Button>
      &nbsp;
      <div className="p-0">
        <Button className="flex items-end" size="small">
          Edit
        </Button>
        &nbsp;
        <Button type="primary" className="flex items-end" size="small" danger>
          Delete
        </Button>
      </div>
      {/* <TimeTicker /> */}
    </div>
  </Timeline.Item>
);

export default TimelineItem;
