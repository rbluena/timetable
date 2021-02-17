import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  // MenuIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  TemplatesIcon,
} from '@app/components/Icons';
import { Avatar, Button } from '@app/components';

const LeftSidebar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="flex flex-col items-center w-16 fixed justify-between h-screen bg-tertiary-50 border-r-2 border-primary-200">
      <div className="w-full">
        {/* <MenuIcon size="sm" /> */}

        <div className="mt-16 flex flex-col w-full justify-center">
          <div
            className={`${
              pathname === '/' && 'border-r-2 border-neutral-900'
            } pl-5`}
          >
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <HomeIcon size="sm" />
              </a>
            </Link>
          </div>
          &nbsp;
          <div
            className={`${
              pathname === '/templates' && 'border-r-2 border-neutral-900'
            } pl-5`}
          >
            <Link href="/templates">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <TemplatesIcon
                  size="sm"
                  variant={pathname === '/templates' ? '' : 'neutral'}
                />
              </a>
            </Link>
          </div>
          &nbsp;
          <div
            className={`${
              pathname === '/settings' && 'border-r-2 border-neutral-900'
            } pl-5`}
          >
            <Link href="/settings">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <CogIcon
                  size="sm"
                  variant={pathname === '/settings' ? '' : 'neutral'}
                />
              </a>
            </Link>
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
};

export default LeftSidebar;
