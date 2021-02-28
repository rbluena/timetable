import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { format } from 'date-fns';

const { Title } = Typography;

const TimelineHeader = ({ date }) => (
  <div className="flex items-center pb-8">
    <Title type="secondary" level={4} className="uppercase">
      {format(date, 'EEEE dd')}
    </Title>
  </div>
);

TimelineHeader.propTypes = {
  date: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TimelineHeader;
