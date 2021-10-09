import React, { Fragment, useRef, useEffect } from "react";
import { chakra, Flex } from "@chakra-ui/react";
import uniqid from "uniqid";
import { capitalize } from "../../../../utils";

const Events = ({ G: { chat } }) => {
  const logRef = useRef();

  useEffect(() => {
    if (!logRef.current) return;
    const node = logRef.current;
    node.scrollTop = node.scrollHeight;
  }, [chat]);

  return (
    <Flex position="relative" h="full" flex={1}>
      <Flex
        direction="column"
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
      >
        <Flex
          direction="column"
          overflowY="scroll"
          ref={logRef}
          mt="auto"
          fontFamily="Roboto Mono"
          fontSize="xs"
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
          {chat.map((msg) => {
            if (msg.id === "-1") {
              let msgParts = msg.content.split("\n");

              return (
                <Fragment key={uniqid()}>
                  {msgParts.slice(1, msgParts.length).map((msgPart) => (
                    <Fragment key={uniqid()}>&gt; {msgPart}</Fragment>
                  ))}

                  <chakra.span color={msg.successful ? "green.300" : "red.400"}>
                    &gt; {capitalize(msgParts[0])}
                  </chakra.span>
                </Fragment>
              );
            }
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Events;
