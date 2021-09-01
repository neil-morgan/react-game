import React from "react";
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
import ultralightCopy from "copy-to-clipboard-ultralight";

const handleCopyClick = (id) => {
  ultralightCopy(id);
};

const WaitingRoom = ({ players, id, leaveRoom }) => {
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
        <Button
          id="roomID"
          colorScheme="primary"
          onClick={() => handleCopyClick(id)}
          my={8}
        >
          {id}
        </Button>
        <Text color="primary.300" size="3xl" fontWeight="bold">
          {players.length === 0 ? "" : `${players.length - 1}`}
        </Text>{" "}
        <Text>more players required</Text>
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
