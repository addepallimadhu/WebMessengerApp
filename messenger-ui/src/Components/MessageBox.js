import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react";
import "../App.css";
import apiUrl from "../Utils/ApiUrl";
import { CircularProgress } from "@mui/material";

function MessageBox(props) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tick = () => {
      fetch(
        `${apiUrl()}/message/?sender=${props.userName}&receiver=${
          props.otherUser
        }`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.authToken,
          },
        }
      )
        .then((resp) => resp.json())
        .then((messages) => {
          setMessages(messages);
          setIsLoading(false);
        });
    };

    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [props.otherUser, props.userName]);

  const message = (item) => {
    let message;
    let messageDate = new Date(item.time);
    if (item.sender === props.userName) {
      message = (
        <div className="Message-element">
          {item.message}{" "}
          <span className="Message-time">{messageDate.toLocaleString()}</span>
        </div>
      );
    } else {
      message = (
        <div className="Received-Message-element">
          {item.message}{" "}
          <span className="Message-time">{messageDate.toLocaleString()}</span>
        </div>
      );
    }
    return message;
  };

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="Messages-box">
          {messages.map((item) => message(item))}
        </div>
      )}
    </div>
  );
}

export default MessageBox;
