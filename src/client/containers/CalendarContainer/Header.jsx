// import { Button } from '@app/components';
import { Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { ChevronLeftIcon, ChevronRightIcon } from '@app/components/Icons';

const Header = () => (
  <div className="flex w-full p-2 z-50 bg-white border-b border-neutral-300">
    <div className="flex">
      <Button icon={<LeftOutlined />} />
      &nbsp;
      <Button type="primary">Today</Button>
      &nbsp;
      <Button icon={<RightOutlined />} />
    </div>
  </div>
);

export default Header;
