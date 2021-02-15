import {
  MenuIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  TemplatesIcon,
} from '@app/components/Icons';
import { Avatar, Button } from '@app/components';

const LeftSidebar = () => (
  <div className="flex flex-col items-center justify-between h-screen p-4 bg-secondary-50 border-r-2 border-primary-200">
    <div>
      {/* <MenuIcon size="sm" /> */}

      <div className="mt-16 flex flex-col justify-center">
        <Button>
          <HomeIcon size="sm" />
        </Button>
        &nbsp;
        <Button>
          <TemplatesIcon size="sm" />
        </Button>
        &nbsp;
        <Button>
          <CogIcon size="sm" />
        </Button>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <Button>
        <LogoutIcon size="sm" />
      </Button>
      &nbsp;
      <Avatar initials="NA" size="lg" />
    </div>
  </div>
);

export default LeftSidebar;
