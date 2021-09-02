import React from "react";
import {
  Flex,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
} from "@chakra-ui/react";

const CreateGame = ({
  createRoom,
  cName,
  cNameCount,
  handleKeyDown,
  maxNameLength,
  num,
  setNum,
  setCName,
}) => {
  const max = 8;
  const min = 2;

  const handleChange = (value) => setNum(value);

  return (
    <>
      <Heading color="white" size="lg" textAlign="center">
        Create a game
      </Heading>

      <Flex direction="column" mt={6}>
        <Text w="full" mb={2} textAlign="left">
          Players
        </Text>
        <NumberInput
          defaultValue={min}
          min={min}
          max={max}
          value={num}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text size="xs" mt={1} ml="auto">
          max: {max}
        </Text>
      </Flex>

      <Flex direction="column">
        <Text w="full" mb={2} textAlign="left">
          Your name
        </Text>
        <Input
          type="text"
          maxLength={`${maxNameLength}`}
          spellCheck="false"
          autoComplete="off"
          isRequired
          colorScheme="primary"
          onKeyDown={(e) => handleKeyDown(e, cName)}
          onChange={(e) => setCName(e.target.value)}
          onPaste={(e) => e.preventDefault()}
        />
        <Text size="xs" mt={1} ml="auto" color={cNameCount === 0 && "red.400"}>
          {cNameCount}
        </Text>
      </Flex>

      <Button
        colorScheme="primary"
        disabled={cName.length === 0}
        onClick={createRoom}
        size="md"
        mt="auto"
      >
        create
      </Button>
    </>
  );
};

export default CreateGame;
