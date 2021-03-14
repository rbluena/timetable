import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const AlertNotifications = ({ type, message, details, closeAlert }) => (
  <div className="max-w-xl mx-auto">
    <Alert
      type={type}
      message={message}
      description={details}
      showIcon
      closable
      onClose={closeAlert}
    />
  </div>
);

AlertNotifications.defaultProps = {
  details: '',
};

AlertNotifications.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeAlert: PropTypes.func.isRequired,
  details: PropTypes.string,
};

export default AlertNotifications;
