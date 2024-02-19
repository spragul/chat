import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";
import { url } from "../../../App";
import { io } from "socket.io-client";
import "./chatpage.css";
import { BsFillSendFill } from "react-icons/bs";
import Navbartop from "../../NavBar.js/navbar";
const socket = io.connect("https://chatapp-jarv.onrender.com");

export default function App() {
  const id = sessionStorage.getItem("myid");
  let myname = sessionStorage.getItem("myname");
  const [currentMessage, setCurrentMessage] = useState("");
  const [contectlist, setContectlist] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [room, setRoom] = useState("");

  //get Chats
  async function getchat(roomid) {
    try {
      let response = await axios.get(`${url}/chat/${roomid}`);
      console.log(response);
      setMessageList(response.data.chatdata.chat);
    } catch (error) {
      alert(`Server Error ${error}`);
    }
  }
  //joining one room
  const joinRoom = (room) => {
    setRoom(room);
    if (myname !== "" && room !== "") {
      socket.emit("join_room", room);
      console.log(room, myname);
      getchat(room);
    }
  };
  //send message
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: myname,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      console.log(messageData);
      await socket.emit("send_message", messageData);
      console.log("message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  console.log(contectlist);
  //get user roomid and mobile number data
  async function getuserroom(id) {
    try {
      let response = await axios.get(`${url}/user/${id}`);
      console.log(response);
      setContectlist(response.data.user.chatNumber);
    } catch (error) {
      alert(`Server Error ${error}`);
    }
  }
  useEffect(() => {
    getuserroom(id);
  }, []);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);
  return (
    <Navbartop>
      <div className="container">
        <div className="inside-container">
          <ScrollToBottom className="message-container">
            {contectlist.map((num, index) => (
              <div className="side-container">
                <p>
                  Name:<span>{num.name}</span>
                </p>
                <p>
                  Mobile:<span>{num.mobile}</span>
                </p>
                <button
                  onClick={() => {
                    joinRoom(num.roomid);
                  }}
                  className="room-btn"
                >
                  Message
                </button>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent) => {
                return (
                  <div>
                    {console.log(messageContent)}

                    <div
                      className="message"
                      id={myname === messageContent.author ? "you" : "other"}
                    >
                      <div>
                        <div className="message-content">
                          <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                          <p id="time">{messageContent.time}</p>
                          <p id="author">{messageContent.author}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type your message ..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>
              <BsFillSendFill />
            </button>
          </div>
        </div>
      </div>
    </Navbartop>
  );
}
