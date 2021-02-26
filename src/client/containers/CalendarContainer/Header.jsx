import PropTypes from 'prop-types';
import { Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const Header = ({ setNext, setPrev, setToday }) => (
  <div className="flex w-full p-2 z-50 bg-white border-b border-neutral-300">
    <div className="flex">
      <Button icon={<LeftOutlined />} onClick={setPrev} />
      &nbsp;
      <Button type="primary" onClick={setToday}>
        Today
      </Button>
      &nbsp;
      <Button icon={<RightOutlined />} onClick={setNext} />
    </div>
  </div>
);

Header.propTypes = {
  setNext: PropTypes.func.isRequired,
  setPrev: PropTypes.func.isRequired,
  setToday: PropTypes.func.isRequired,
};

export default Header;
