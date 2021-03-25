import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar } from 'antd';
import {
  // MenuIcon,
  CogIcon,
  GridIcon,
  LogoutIcon,
  TemplatesIcon,
  ClockIcon,
} from '@app/components/Icons';

const LeftSidebar = ({ user }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div
      className="flex flex-col items-center w-16 fixed justify-between h-screen bg-tertiary-50 border-r-2 border-primary-200"
      style={{ zIndex: 100 }}
    >
      <div className="w-full">
        {/* <MenuIcon size="sm" /> */}

        <div className="mt-16 flex flex-col w-full justify-center">
          <div
            className={`${
              pathname === '/projects' && 'border-r-2 border-primary-400'
            } pl-5`}
          >
            <Link href="/projects">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <GridIcon
                  size="sm"
                  variant={pathname === '/projects' ? '' : 'neutral'}
                />
              </a>
            </Link>
          </div>
          &nbsp;
          <div
            className={`${
              pathname === '/my-timer' && 'border-r-2 border-neutral-900'
            } pl-5`}
          >
            <Link href="/my-timer">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <ClockIcon
                  size="sm"
                  variant={pathname === '/my-timer' ? '' : 'neutral'}
                />
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
      <div className="flex flex-col items-center pb-4">
        <Link href="/signout">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <LogoutIcon size="sm" variant="neutral" />
          </a>
        </Link>
        &nbsp;
        {user.image && user.image.thumbnail ? (
          <Avatar src={user.image.thumbnail} />
        ) : (
          <Avatar style={{ backgroundColor: '#f56a00' }}>
            {user.fullName ? user.fullName[0] : 'U'}
          </Avatar>
        )}
      </div>
    </div>
  );
};

LeftSidebar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LeftSidebar;
