const apiUrl = () => {
  if (process.env.REACT_APP_API_PORT == 80)
    return window.location.protocol + "//" + window.location.host + "/api";
  else
    return (
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      process.env.REACT_APP_API_PORT +
      "/api"
    );
};

export default apiUrl;
