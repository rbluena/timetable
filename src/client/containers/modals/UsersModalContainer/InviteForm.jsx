import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

const InviteForm = ({ inviteUser }) => {
  const [email, setEmail] = useState('');

  function inviteUserHandler() {
    if (email.length > 0) {
      inviteUser({ email });
      setEmail('');
    }
  }

  return (
    <div className="flex p-0 m-0">
      <Input
        placeholder="Email address"
        onChange={(evt) => setEmail(evt.target.value)}
      />
      &nbsp;
      <Button
        type="primary"
        disabled={!email.length}
        onClick={inviteUserHandler}
      >
        Invite
      </Button>
    </div>
  );
};

InviteForm.propTypes = {
  inviteUser: PropTypes.func.isRequired,
};

export default InviteForm;
