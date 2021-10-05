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
    <Flex
      position="relative"
      w="full"
      h="full"
      maxW={{ base: "full", xs: "300px" }}
      ml="auto"
    >
      <Flex
        position="absolute"
        h="full"
        w="full"
        overflowY="scroll"
        fontFamily="Roboto Mono"
        fontSize="xs"
        ml="auto"
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
        <Flex direction="column">
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
