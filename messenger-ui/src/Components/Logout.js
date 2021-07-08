import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '1006529598178-qes2svv7q1t0a6pfgq01gq1te9fosee6.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;

