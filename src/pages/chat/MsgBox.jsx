import React, { useRef, useState, useEffect, useCallback } from "react";
import "./chat.css";
import Loader from "../../components/Loader";

const MsgBox = ({
  chatOn,
  toUserName,
  typing,
  messages,
  fromUser,
  message,
  inputChange,
  onSend,
  msgLoad,
}) => {
  const [newConversation, setNewConversation] = useState(false);
  const mesRef = useRef(null);
  const scroll = () => {
    if (mesRef.current !== null) {
      mesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };
  useEffect(() => {
    mesRef.current && scroll();
  }, [messages, mesRef]);
  const loaderMargin = {
    marginTop: "50vh",
    marginLeft: "30vw",
  };
  return (
    <>
      {chatOn ? (
        msgLoad ? (
          <Loader loaderMargin={loaderMargin} />
        ) : (
          <div className="chatwrapper" style={{ marginTop: "8vh" }}>
            <div className="form-group w-50 mx-auto p-5">
              <div ref={mesRef}>
                <div className="typing">
                  <h4 style={{ color: "white" }}>{toUserName}</h4>
                  <br />
                  <h4 style={{ color: "white" }}>{typing}</h4>
                </div>
                {messages !== undefined ? (
                  <>
                    {messages.map((message, index) => {
                      const time = message.date;
                      return (
                        <div
                          key={index}
                          className={
                            message.msgFrom === fromUser
                              ? "sent_div card border shadow"
                              : "rec_div card border shadow"
                          }
                        >
                          <p>{message.msg}</p>
                          <p style={{ float: "right", fontSize: "7px" }}>
                            {time}
                          </p>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h1 style={{ marginTop: "30vh" }}>
                      Start New Conversation
                    </h1>
                  </>
                )}
              </div>

              <div className="data_send">
                <textarea
                  type="text"
                  value={message}
                  placeholder="Type your message here"
                  name="message"
                  onChange={(e) => inputChange(e)}
                />
                <br />

                <div className="send_icon">
                  <i
                    onClick={onSend}
                    className="fa fa-paper-plane-o"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        )
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
    </>
  );
};

export default MsgBox;
