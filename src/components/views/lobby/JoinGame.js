import React from "react";
import { Flex, Input, Button, Heading, Text } from "@chakra-ui/react";

const JoinGame = ({
  handleKeyDown,
  jName,
  jNameCount,
  joinRoom,
  maxNameLength,
  room,
  roomIDLength,
  setRoom,
  setJName,
}) => {
  return (
    <>
      <Heading color="white" size="lg" textAlign="center">
        Join a game
      </Heading>

      <Flex direction="column" my={6}>
        <Text w="full" mb={2} textAlign="left">
          Room ID
        </Text>
        <Input
          id="roomIdentification"
          type="text"
          maxLength={`${roomIDLength}`}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setRoom(e.target.value)}
        />
      </Flex>

      <Flex direction="column">
        <Text w="full" mb={2} textAlign="left">
          Your name
        </Text>

        <Input
          id="joinName"
          type="text"
          maxLength={`${maxNameLength}`}
          spellCheck="false"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e, jName)}
          onChange={(e) => setJName(e.target.value)}
          onPaste={(e) => e.preventDefault()}
        />

        <Text size="xs" mt={1} ml="auto" color={jNameCount === 0 && "red.400"}>
          {jNameCount}
        </Text>
      </Flex>

      <Button
        colorScheme="primary"
        disabled={room.length !== roomIDLength || jName.length === 0}
        onClick={() => joinRoom(room, jName)}
        size="md"
        mt="auto"
      >
        join
      </Button>
    </>
  );
};

export default JoinGame;
