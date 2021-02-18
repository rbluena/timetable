import PropTypes from 'prop-types';
import { Button, TimeTicker, Text } from '@app/components';
import { BellOutlineIcon } from '@app/components/Icons';

const Header = ({ showTimer, heading, title }) => (
  <div className="w-full border-b bg-white border-neutral-100 flex justify-between p-2 px-4 relative">
    <div className={`items-center ${showTimer ? 'absolute' : ''}`}>
      <h2 className=" font-extrabold text-lg text-secondary-400 m-0 p-0 whitespace-pre-wrap">
        {heading}
      </h2>
      {/* <p className="font-bold text-lg">BSc and Mathematics</p> */}
    </div>
    {showTimer && (
      <div className="mx-auto">
        <TimeTicker />
      </div>
    )}

    {title && title.length > 0 && (
      <div className="mx-auto">
        <Text text={title} type="subheading" variant="neutral" />
      </div>
    )}
    <div>
      <Button className="relative">
        <span className="bg-secondary-500 h-2 w-2 rounded-full block absolute top-1 left-1" />
        <BellOutlineIcon size="sm" variant="secondary" />
      </Button>
    </div>
  </div>
);

Header.defaultProps = {
  heading: '',
  showTimer: false,
};

Header.propTypes = {
  showTimer: PropTypes.bool,
  heading: PropTypes.string,
};

export default Header;
