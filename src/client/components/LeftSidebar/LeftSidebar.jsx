import {
  // MenuIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  TemplatesIcon,
} from '@app/components/Icons';
import { Avatar, Button } from '@app/components';

const LeftSidebar = () => (
  <div className="flex flex-col items-center w-16 justify-between h-screen bg-tertiary-50 border-r-2 border-primary-200">
    <div className="w-full">
      {/* <MenuIcon size="sm" /> */}

      <div className="mt-16 flex flex-col w-full justify-center">
        <div className="border-r-2 border-neutral-900 pl-5">
          <Button>
            <HomeIcon size="sm" />
          </Button>
        </div>
        &nbsp;
        <div className="pl-5">
          <Button>
            <TemplatesIcon size="sm" variant="neutral" />
          </Button>
        </div>
        &nbsp;
        <div className="pl-5">
          <Button>
            <CogIcon size="sm" variant="neutral" />
          </Button>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center pb-2">
      <Button>
        <LogoutIcon size="sm" variant="neutral" />
      </Button>
      &nbsp;
      <Avatar initials="NA" size="lg" />
    </div>
  </div>
);

export default LeftSidebar;
