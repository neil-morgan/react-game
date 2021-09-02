import React, { useState, useEffect } from "react";
import {
  Flex,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import uniqid from "uniqid";
import { Icon } from "../../";

const handleKeyUp = (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    // enter key: another way to send a message
    document.getElementById("send-button").click();
  }
};

const ChatLog = ({ G, playerID, moves }) => {
  const [msg, setMsg] = useState("");

  const message = (content) => {
    moves.message(playerID, content);
    document.getElementById("player-msg").value = "";
    setMsg("");
  };

  useEffect(() => {
    // when a new message appear, automatically scroll chat box (when applicable) to bottom to show it
    let objDiv = document.getElementById("scrollBottom");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [G.chat]);

  return (
    <Flex direction="column" position="absolute" bottom={10} right={10}>
      <div id="scrollBottom" className="msgs">
        {G.chat.map((msg) => {
          let className = "msg ";
          if (msg.id === "-1") {
            let msgParts = msg.content.split("\n");
            className += "bot-msg ";
            return (
              <div id="playerMsg" className={className} key={uniqid()}>
                <span
                  className={
                    msg.successful ? "successful-color" : "unsuccessful-color"
                  }
                >
                  {msgParts[0]}
                </span>
                <div className="addendums">
                  {msgParts.slice(1, msgParts.length).map((msgPart) => (
                    <div key={uniqid()}>{msgPart}</div>
                  ))}
                </div>
              </div>
            );
          } else {
            return (
              <div id="playerMsg" className={className} key={uniqid()}>
                <span className="msg-sender">
                  {G.players[msg.id].name + ": "}
                </span>
                {msg.content}
              </div>
            );
          }
        })}
      </div>

      <div className="chat-form">
        <Input
          id="player-msg"
          type="text"
          maxLength="70"
          placeholder="Enter Message"
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
          autoComplete="off"
        />
        <IconButton
          onClick={() => message(msg)}
          disabled={msg.length === 0}
        ></IconButton>
      </div>
    </Flex>
  );
};

export default ChatLog;
