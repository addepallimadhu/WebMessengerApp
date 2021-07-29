export const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

     localStorage.setItem('authToken', res.tokenObj.id_token);

    console.log(res);
console.log(res.tokenObj.id_token);
  
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log('newAuthRes:', newAuthRes);
      console.log('ID TOKEN:', newAuthRes.id_token); 
      // saveUserToken(newAuthRes.access_token);  <-- save new token
    //  localStorage.setItem('authToken', newAuthRes.id_token);
	 localStorage.setItem('authToken', newAuthRes.id_token);
  
      // Setup the other timer after the first one
      setTimeout(refreshToken,refreshTiming) ;//refreshTiming
    };
  
    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  };