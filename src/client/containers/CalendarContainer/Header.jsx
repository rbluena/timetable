import { Button } from '@app/components';
import { ChevronLeftIcon, ChevronRightIcon } from '@app/components/Icons';

const Header = () => (
  <div className="flex w-full p-2 z-50 bg-white border-b border-neutral-300">
    <div className="flex">
      <Button variant="primary">
        <ChevronLeftIcon />
      </Button>
      <Button variant="primary" className="mx-2 px-4">
        Today
      </Button>
      <Button variant="primary">
        <ChevronRightIcon />
      </Button>
    </div>
  </div>
);

export default Header;
