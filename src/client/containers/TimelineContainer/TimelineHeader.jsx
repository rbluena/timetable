import PropTypes from 'prop-types';
import { Typography } from 'antd';

const { Title } = Typography;

const TimelineHeader = ({ date }) => (
  <div className="flex items-center pb-3">
    <Title type="secondary" level={4}>
      {date}
    </Title>
  </div>
);

TimelineHeader.propTypes = {
  date: PropTypes.string.isRequired,
};

export default TimelineHeader;
