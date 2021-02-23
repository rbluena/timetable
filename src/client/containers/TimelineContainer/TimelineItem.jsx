import { Timeline, Button, Typography } from 'antd';

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
    <div className="pb-4">
      <Button type="primary">Details</Button>
      &nbsp;
      <Button type="link" className="flex items-end">
        Edit
      </Button>
      {/* <TimeTicker /> */}
    </div>
  </Timeline.Item>
);

export default TimelineItem;
