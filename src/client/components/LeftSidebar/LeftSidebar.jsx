import {
  // MenuIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  TemplatesIcon,
} from '@app/components/Icons';
import { Avatar, Button } from '@app/components';

const LeftSidebar = () => (
  <div className="flex flex-col items-center justify-between h-screen p-2 bg-tertiary-50 border-r-2 border-primary-200">
    <div>
      {/* <MenuIcon size="sm" /> */}

      <div className="mt-16 flex flex-col justify-center">
        <Button>
          <HomeIcon size="sm" variant="primary" />
        </Button>
        &nbsp;
        <Button>
          <TemplatesIcon size="sm" variant="primary" />
        </Button>
        &nbsp;
        <Button>
          <CogIcon size="sm" variant="primary" />
        </Button>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <Button>
        <LogoutIcon size="sm" variant="primary" />
      </Button>
      &nbsp;
      <Avatar initials="NA" size="lg" />
    </div>
  </div>
);

export default LeftSidebar;
