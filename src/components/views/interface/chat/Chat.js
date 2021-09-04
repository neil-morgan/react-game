import React, { useState, useRef, useEffect } from "react";
import { chakra, Flex, Input, IconButton, Text } from "@chakra-ui/react";
import uniqid from "uniqid";
import { Icon } from "../../../common";
import { useRipple } from "../../../../hooks";

const Chat = ({ G, playerID, moves }) => {
  const [msg, setMsg] = useState("");

  const chatRef = useRef();
  const msgRef = useRef();
  const sendRef = useRef();

  useRipple(sendRef);

  const sendMessage = (content) => {
    moves.message(playerID, content);
    msgRef.current.value = "";
    setMsg("");
  };

  const handleKeyUp = (evt) => {
    evt.preventDefault();
    evt.key === "Enter" && sendRef.current.click();
  };

  useEffect(() => {
    if (!chatRef.current) return;
    const node = chatRef.current;
    node.scrollTop = node.scrollHeight;
  }, [G.chat]);

  return (
    <Flex direction="column" w="300px">
      <Flex
        direction="column"
        maxH="150px"
        overflowY="scroll"
        ref={chatRef}
        pr={4}
        sx={{
          "::-webkit-scrollbar": {
            width: "3px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.200",
            borderRadius: "2px",
            border: "0px solid transparent",
            backgroundClip: "content-box",
          },
        }}
      >
        {G.chat.map((msg) => {
          if (msg.id !== "-1") {
            return (
              <Text size="xs" key={uniqid()}>
                <chakra.span
                  fontSize="xs"
                  fontFamily="Roboto Mono"
                  color="primary.200"
                >
                  {G.players[msg.id].name + ": "}
                </chakra.span>
                {msg.content}
              </Text>
            );
          }
        })}
      </Flex>

      <Flex mt={4}>
        <Input
          ref={msgRef}
          type="text"
          maxLength={140}
          placeholder="Enter Message"
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
          autoComplete="off"
        />
        <IconButton
          ref={sendRef}
          onClick={() => sendMessage(msg)}
          disabled={msg.length === 0}
          colorScheme="primary"
          variant="ghost"
          ml={2}
        >
          <Icon name="email" boxSize={8} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default Chat;
