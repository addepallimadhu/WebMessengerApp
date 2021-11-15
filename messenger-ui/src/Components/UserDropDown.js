import React, { useEffect, useState } from "react";
import apiUrl from "../Utils/ApiUrl";

const UserDropDown = (props) => {
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    const tick = () => {
      fetch(`${apiUrl()}/user/otherUsers/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.authToken,
        },
      })
        .then((resp) => resp.json())
        .then((resp_json) => {
          if (resp_json.length !== 0 && otherUsers.length == 0) {
            props.getBackSelectedUser(resp_json[0].username);
            props.getBackIsOtherUserSelected(true);
          }
          setOtherUsers(resp_json);
        });
    };

    const interval = setInterval(tick, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const userOption = (obj) => {
    return <option>{obj.username}</option>;
  };

  const handleChange = (e) => {
    props.getBackSelectedUser(e.target.value);
    props.getBackIsOtherUserSelected(true);
  };

  return (
    <div>
      <select id="users" name="users" onChange={handleChange}>
        {otherUsers.map(userOption)}
      </select>
    </div>
  );
};

export default UserDropDown;
