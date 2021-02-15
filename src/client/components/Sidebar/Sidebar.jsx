import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@app/components/Icons';
import { Button } from '@app/components';

const Sidebar = ({ children, isOpen }) => (
  <aside
    className={`transition-all duration-500 ease-in-out transform max-w-sm overflow-y-scroll ${
      isOpen ? '' : 'translate-x-full'
    }  bg-neutral-50 fixed right-0 top-0 z-50 shadow-lg min-h-screen max-h-screen w-full md:w-2/6`}
  >
    {children}
  </aside>
);

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

Sidebar.Header = ({ children, onClose }) => (
  <div className="flex px-4 py-6">
    {children}
    <Button outline size="xs" className="ml-auto" onClick={onClose}>
      <CloseIcon size="sm" />
    </Button>
  </div>
);

Sidebar.Header.defaultProps = {
  children: null,
};

Sidebar.Header.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Sidebar.Content = ({ children }) => <div>{children}</div>;

Sidebar.Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
