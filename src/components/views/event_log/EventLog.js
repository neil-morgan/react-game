import React, { Fragment, useRef, useEffect } from "react";
import { chakra, Flex } from "@chakra-ui/react";
import uniqid from "uniqid";

const EventLog = ({ G }) => {
  const logRef = useRef();

  useEffect(() => {
    if (!logRef.current) return;
    const node = logRef.current;
    node.scrollTop = node.scrollHeight;
  }, [G.chat]);

  return (
    <Flex
      direction="column"
      position="absolute"
      bottom={6}
      right={4}
      pr={4}
      maxW="360px"
      maxH="200px"
      overflowY="scroll"
      fontFamily="Roboto Mono"
      fontSize="xs"
      ref={logRef}
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
        if (msg.id === "-1") {
          let msgParts = msg.content.split("\n");

          return (
            <Fragment key={uniqid()}>
              {msgParts.slice(1, msgParts.length).map((msgPart) => (
                <Fragment key={uniqid()}>&gt; {msgPart}</Fragment>
              ))}

              <chakra.span color={msg.successful ? "green.300" : "red.400"}>
                &gt; {msgParts[0]}
              </chakra.span>
            </Fragment>
          );
        }
      })}
    </Flex>
  );
};

export default EventLog;
