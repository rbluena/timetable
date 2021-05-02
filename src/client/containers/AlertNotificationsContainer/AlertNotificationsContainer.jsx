import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalNotification } from '@app/selectors';
import { AlertNotifications } from '@app/components';
import { clearNotificationAction } from '@app/actions';

const AlertNotificationsContainer = () => {
  const [notification, setNotification] = useState();
  const dispatch = useDispatch();
  const { message, type } = useSelector(getGlobalNotification) || {};

  function resetNotification() {
    dispatch(clearNotificationAction());
    setNotification(null);
  }

  useEffect(() => {
    if (type && message) {
      if (typeof message === 'string') {
        setNotification({ type, message });
      } else {
        const key = Object.keys(message)[0];
        const msg = message[key];
        setNotification({ type, message: msg });
      }
    }
  }, [type, message]);

  return (
    <div className="fixed w-full" style={{ zIndex: 1000 }}>
      {notification && (
        <AlertNotifications
          type={notification.type}
          message={notification.message}
          description={notification.description}
          closeAlert={resetNotification}
        />
      )}
    </div>
  );
};

export default AlertNotificationsContainer;
