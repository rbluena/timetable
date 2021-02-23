import { TimePicker } from 'antd';

const { RangePicker } = TimePicker;
// const hours = [
//   '12:00 AM',
//   '12:05 AM',
//   '12:10 AM',
//   '12:15 AM',
//   '12:20 AM',
//   '12:25 AM',
//   '12:30 AM',
//   '12:35 AM',
//   '12:40 AM',
//   '12:45 AM',
//   '12:50 AM',
//   '12:55 AM',
//   '01:00 AM',
//   '01:05 AM',
//   '01:10 AM',
//   '01:15 AM',
//   '01:20 AM',
//   '01:25 AM',
//   '01:30 AM',
//   '01:35 AM',
//   '01:40 AM',
//   '01:45 AM',
//   '01:50 AM',
//   '01:55 AM',
//   '02:00 AM',
//   '02:05 AM',
//   '03:00 AM',
//   '04 AM',
//   '05 AM',
//   '06 AM',
//   '07 AM',
//   '08 AM',
//   '09 AM',
//   '10 AM',
//   '11 AM',
//   '12 PM',
//   '07 PM',
//   '08 PM',
//   '03 PM',
//   '04 PM',
//   '05 PM',
//   '06 PM',
//   '07 PM',
//   '08 PM',
//   '09 PM',
//   '10 PM',
//   '11 PM',
// ];

const hours = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const minutes = [
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

const TimeSpanPicker = () => (
  <div>
    <div>
      <RangePicker />
      {/* <select name="" id="" className="bg-white p-2 outline-none">
        {hours.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select> */}
      {/* <select name="" id="" className="bg-white p-2 outline-none">
        {minutes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select> */}
    </div>
  </div>
);

export default TimeSpanPicker;
