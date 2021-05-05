import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Avatar, Tooltip } from 'antd';

import {
  // BellOutlineIcon,
  HomeIcon,
  CogIcon,
  GridIcon,
  LogoutIcon,
  LoginIcon,
  // TemplatesIcon,
  // ClockIcon,
} from '@app/components/Icons';
import { isEmpty } from 'lodash';

const LeftSidebar = ({ user }) => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div
      className="flex flex-col items-center w-16 fixed justify-between h-screen bg-white border-r border-primary-200"
      style={{ zIndex: 100 }}
    >
      <div className="w-full">
        <div className="mt-16 flex flex-col w-full justify-center">
          <div
            className={`pl-5 ${
              pathname === '/' ? 'border-r-2 border-primary-600' : ''
            }`}
          >
            <Link href="/">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>
                <HomeIcon
                  size="sm"
                  variant={pathname === '/' ? 'primary' : ''}
                />
              </a>
            </Link>
          </div>
          &nbsp;
          {/* start: User's projects */}
          {!isEmpty(user) && (
            <>
              <div
                className={`${
                  pathname.includes('/projects') &&
                  'border-r-2 border-primary-600'
                } pl-5`}
              >
                <Link href="/projects">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <GridIcon
                      size="sm"
                      variant={pathname.includes('/projects') ? 'primary' : ''}
                    />
                  </a>
                </Link>
              </div>
              &nbsp;
            </>
          )}
          {/* end: User's projects */}
          {/* start: Log user in link */}
          {isEmpty(user) && (
            <div
              className={`pl-5 ${
                pathname.includes('/signin')
                  ? 'border-r-2 border-primary-600'
                  : ''
              }`}
            >
              <Link href="/signin">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <Tooltip>
                    <LoginIcon
                      size="sm"
                      variant={pathname.includes('/signin') ? 'primary' : ''}
                    />
                  </Tooltip>
                </a>
              </Link>
            </div>
          )}
          {/* end: Loggin user in */}
          {/* &nbsp;
          <div
            className={`${
              pathname === '/my-timer' && 'border-r-2 border-neutral-900'
            } pl-5`}
          >
            <Link href="/my-timer">
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
              <a>
                <TemplatesIcon
                  size="sm"
                  variant={pathname === '/templates' ? '' : 'neutral'}
                />
              </a>
            </Link>
          </div>
          &nbsp; */}
        </div>
      </div>

      {/* start: Authenticated user links */}
      {!isEmpty(user) && (
        <div className="flex flex-col items-center pb-4">
          {/* <Link href="/notifications">
          <a className="relative">
            <span className="bg-secondary-500 h-2 w-2 rounded-full block absolute right-1" />
            <BellOutlineIcon
              size="sm"
              variant={pathname.includes('/notifications') ? '' : 'neutral'}
            />
          </a>
        </Link>
        &nbsp; */}
          <Link href="/settings">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <CogIcon
                size="sm"
                variant={pathname.includes('/settings') ? '' : ''}
              />
            </a>
          </Link>
          &nbsp;
          <Link href="/signout">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <LogoutIcon size="sm" variant="" />
            </a>
          </Link>
          &nbsp;
          {user.image && user.image.thumbnail ? (
            <Avatar
              src={user.image.thumbnail}
              style={{ border: '1px solid #1890ff' }}
            />
          ) : (
            <Avatar style={{ backgroundColor: '#1890ff' }}>
              {user.fullName ? user.fullName[0] : 'U'}
            </Avatar>
          )}
        </div>
      )}
      {/* end: Authenticated user links */}
    </div>
  );
};

LeftSidebar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default LeftSidebar;
