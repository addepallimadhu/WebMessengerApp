import React, { Component, useState } from "react";
import ReactDOM from "react";
import "../App.css";
import MessageBox from "./MessageBox";

import { GoogleLogin, GoogleLogout } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../Utils/RefreshToken";
import apiUrl from "../Utils/ApiUrl";
import UserDropDown from "./UserDropDown";

const clientId =
  "1006529598178-qes2svv7q1t0a6pfgq01gq1te9fosee6.apps.googleusercontent.com";

function Messenger(props) {
  const [otherUser, setOtherUser] = useState("");
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isOtherUserSelected, setIsOtherUserSelected] = useState(false);

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );

    refreshTokenSetup(res);

    setUserName(res.profileObj.email);
    setIsLoggedIn(true);

    fetch(`${apiUrl()}/user/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.authToken,
      },
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
    setIsLoggedIn(false);
    setIsOtherUserSelected(false);
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
  };

  const handleChange = (event) => {
    setOtherUser(event.target.value);
    setIsOtherUserSelected(true);
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
        receiver: otherUser,
        message: text,
      }),
    }).then(() => {
      setText("");
    });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          ></GoogleLogout>
          <b> Logged in as : {userName} </b>
          <br /> <br />
          <UserDropDown
            getBackSelectedUser={setOtherUser}
            getBackIsOtherUserSelected={setIsOtherUserSelected}
          />
          <br /> <br />
        </div>
      ) : (
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
          <b> Please login with you email id to get started</b>
        </div>
      )}

      {isOtherUserSelected ? (
        <div>
          <MessageBox userName={userName} otherUser={otherUser} />
          <form onSubmit={handleSubmit}>
            <label htmlFor="new-todo">Enter your message here...</label>
            <input id="new-todo" onChange={handleTextChange} value={text} />
            <button>Send</button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
//}
export default Messenger;
