import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  Heading,
  Text,
  Tag,
  Wrap,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import { MotionFlex } from "../../";
import { pageTransition } from "../../../animations";
import copyToClipboard from "copy-to-clipboard-ultralight";
import { useRipple } from "../../../hooks";

const WaitingRoom = ({ activePlayers, players, id, leaveRoom }) => {
  const [copied, setCopied] = useState(false);
  const playersRequired = players.length - activePlayers;

  const handleCopyClick = (id) => {
    copyToClipboard(id);
    setCopied(true);
  };

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 1500);
    }
    return () => clearTimeout(timeout);
  }, [copied, id]);

  const copyRef = useRef();
  useRipple(copyRef);

  return (
    <MotionFlex direction="column" m="auto" w="320px" {...pageTransition}>
      <Flex
        direction="column"
        bg="base.900"
        p={8}
        rounded={5}
        textAlign="center"
      >
        <Heading color="white">Welcome!</Heading>
        <Text>Invite your friends</Text>
        <Text size="xs" mt={6}>
          Click to copy
        </Text>
        <Button
          ref={copyRef}
          id="roomID"
          colorScheme="primary"
          onClick={() => handleCopyClick(id)}
          mt={2}
          mb={8}
        >
          {copied ? "Copied" : id}
        </Button>
        <Text color="primary.300" size="3xl" fontWeight="bold">
          {playersRequired.toString()}
        </Text>{" "}
        <Text>{`more player${playersRequired > 1 ? "s" : ""} required`}</Text>
        <Wrap mt={6} spacing={2} justify="center">
          {players.map((player, index) =>
            player.name ? (
              <Tag
                as={WrapItem}
                key={index}
                variant="solid"
                size="sm"
                borderRadius={3}
              >
                {player.name}
              </Tag>
            ) : (
              <Tag key={index} variant="ghost" borderRadius={3} size="sm">
                Empty
              </Tag>
            )
          )}
        </Wrap>
      </Flex>
      <Button
        _active={{ color: "primary.200" }}
        _hover={{ textDecoration: "none", color: "white" }}
        colorScheme="primary"
        variant="link"
        size="xs"
        mt={6}
        onClick={leaveRoom}
      >
        leave room
      </Button>
    </MotionFlex>
  );
};

export default WaitingRoom;
