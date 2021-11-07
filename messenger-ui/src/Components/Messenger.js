import React, { Component, useState } from "react";
import ReactDOM from "react";
import "../App.css";
import MessageBox from "./MessageBox";

import { GoogleLogin, GoogleLogout } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../Utils/RefreshToken";
import apiUrl from "../Utils/ApiUrl";

const clientId =
  "1006529598178-qes2svv7q1t0a6pfgq01gq1te9fosee6.apps.googleusercontent.com";

function Messenger(props) {
  const [otherUser, setOtherUser] = useState("");
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    console.log(res.profileObj.email);
    refreshTokenSetup(res);

    setUserName(res.profileObj.email);

    fetch(`${apiUrl()}/user/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: res.profileObj.email,
        userdisplayname: res.profileObj.name,
      }),
    });

    fetch(`${apiUrl()}/user/otherUsers/${res.profileObj.email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
    })
      .then((resp) => resp.json())
      .then((resp_json) => {
        setUsers(resp_json);
        setOtherUser(resp_json[0].username);
      });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. 😢 `);
  };

  const onLogoutSuccess = () => {
    setOtherUser("");
    setText("");
    setUserName("");
    setUsers([]);
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
  };

  const handleChange = (event) => {
    setOtherUser(event.target.value);
  };

  const userOption = (obj) => {
    return <option>{obj.username}</option>;
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }

    fetch(`${apiUrl()}/message/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
      body: JSON.stringify({
        sender: userName,
        receiver: otherUser,
        message: text,
      }),
    }).then(() => {
      console.log("MESSAGE SENT");
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
      <b>Logged in as : {userName}</b>
      <br />
      <select id="users" name="users" onChange={handleChange}>
        {users.map(userOption)}
      </select>
      <MessageBox userName={userName} otherUser={otherUser} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter your message here...</label>
        <input id="new-todo" onChange={handleTextChange} value={text} />
        <button>Send</button>
      </form>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      ></GoogleLogout>
    </div>
  );
}
//}
export default Messenger;
