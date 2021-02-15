import { Button, TimeTicker } from '@app/components';
import { PauseIcon, BellOutlineIcon } from '@app/components/Icons';

const Header = () => (
  <div className="w-full border-b border-neutral-100 flex p-2 px-4">
    <div className="items-center">
      <h2 className=" font-extrabold text-lg text-secondary-400 m-0 p-0">
        BSc and Mathematics
      </h2>
      {/* <p className="font-bold text-lg">BSc and Mathematics</p> */}
    </div>
    <div className="flex items-center mx-auto">
      <TimeTicker />
      &nbsp;
      <Button>
        <PauseIcon size="sm" />
      </Button>
    </div>
    <div>
      <div>
        <Button className="relative">
          <span className="bg-secondary-500 h-2 w-2 rounded-full block absolute top-1 left-1" />
          <BellOutlineIcon variant="secondary" size="sm" />
        </Button>
      </div>
    </div>
  </div>
);

export default Header;
