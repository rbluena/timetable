import { Text } from '@app/components';

const TimelineHeader = () => (
  <div className="flex items-center pb-3">
    <Text text="TUESDAY" type="subheading" variant="primary" weight="bold" />{' '}
    &nbsp;&nbsp;
    <Text text="23" type="subheading" weight="bold" variant="neutral" />
  </div>
);

export default TimelineHeader;
