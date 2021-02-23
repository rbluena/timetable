import { TimePicker, DatePicker } from 'antd';

const { RangePicker } = TimePicker;

const DateTimeRangePicker = ({ dateProps, timeProps }) => (
  <div className="flex items-center justify-start">
    <DatePicker {...dateProps} bordered={false} />
    <RangePicker
      bordered={false}
      minuteStep={5}
      format="HH:mm"
      {...timeProps}
    />
  </div>
);

export default DateTimeRangePicker;
