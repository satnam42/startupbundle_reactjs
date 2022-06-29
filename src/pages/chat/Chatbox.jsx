import React, { useState, useEffect, useRef, useCallback } from "react";

import SocketIOClient from "socket.io-client";
import { get } from "../../utilities/services/newServices";
import {
  GET_USERS,
  GET_OLD_CHAT,
} from "../../utilities/services/constants/apiLinks";
import "./chat.css";
import axios from "axios";
import MsgBox from "./MsgBox";
import Loader from "../../components/Loader";

var socket = SocketIOClient("http://93.188.167.68:4500");

const ChatBox = () => {
  const [fromUser, setFromUser] = useState(localStorage.getItem("id"));
  const [chatOn, setChatOn] = useState(false);
  const [toUser, setToUser] = useState("");
  const [toUserName, setToUserName] = useState("");
  const [users, setusers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const [userLoad, setUserLoad] = useState(true);
  const [msgLoad, setMsgLoad] = useState(false);
  const mesRef = useRef(null);
  const socketConnetion = () => {
    console.log("check function");
    socket.on("connect", () => {
      console.log("socket conneted");
    });
  };

  const style = { marginLeft: "3vh", marginTop: "30vh" };

  var token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const successActions = (res) => {
      console.log(res);
      const usersList = res.filter((obj) => {
        return obj.firstName !== localStorage.getItem("name");
      });
      setusers(usersList);
      setUserLoad(false);
    };

    get(GET_USERS, successActions, token);

    socketConnetion();
  }, []);

  const selectUser = async (name, id) => {
    setMsgLoad(true);
    setChatOn(true);
    setToUser(id);
    setToUserName(name);
    setMessages([]);
    const cr = `${fromUser}-${id}`;
    const rr = `${id}-${fromUser}`;
    console.log(cr);
    socket.emit("set-user-data", fromUser);
    socket.emit("set-room", { name1: cr, name2: rr }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("set-room", (rId) => {
      const pageNo = 1;
      const pageSize = 100;
      var roomId = rId;
      var chatQuery = `${GET_OLD_CHAT}?room_id=${roomId}&pageNo=${pageNo}&pageSize=${pageSize}`;
      console.log(roomId);
      const successActions = (res) => {
        console.log("chatboxxxx   ", res);
        setMessages(res);
        setMsgLoad(false);
      };

      get(chatQuery, successActions, token);
    });

    socket.on("chat-msg", (data) => {
      console.log("received message" + JSON.stringify(data));

      setMessages((messages) => {
        return [...messages, data];
      });
    });

    socket.on("typing", (str) => {
      setTyping(str);
      setTimeout(() => {
        setTyping("");
      }, 2000);
    });
  };

  const inputChange = (e) => {
    setMessage(e.target.value);
    socket.emit("typing");
  };

  const onSend = async (e) => {
    socket.emit("chat-msg", {
      msg: message,
      msgTo: toUser,
      date: Date.now(),
    });
    setMessage("");
  };

  return (
    <div className="container">
      <div className="side_out" style={{ overflowY: "scroll" }}>
        <ul className="list-group">
          <li
            onClick={() => {
              setChatOn(false);
            }}
            style={{ textAlign: "center" }}
            className="list-group-item active"
            aria-current="true"
          >
            <h4>Contacts</h4>
          </li>
          {userLoad ? (
            <Loader loaderMargin={style} />
          ) : (
            <>
              {users.map((user, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      backgroundColor: toUser === user.id ? "#007bff" : "white",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                    onClick={(e) => selectUser(user.firstName, user.id)}
                    className="list-group-item"
                  >
                    {user.firstName}
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </div>

      {chatOn ? (
        <>
          <MsgBox
            chatOn={chatOn}
            toUserName={toUserName}
            typing={typing}
            messages={messages}
            fromUser={fromUser}
            message={message}
            inputChange={inputChange}
            onSend={onSend}
            msgLoad={msgLoad}
          />
        </>
      ) : (
        <div className="icon_wrapper mx-auto">
          <div>
            <h1>Select a contact you want to chat with</h1>
            <i
              style={{ fontSize: "100px", marginLeft: "40%" }}
              className="fa fa-commenting-o"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
