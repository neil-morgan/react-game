import React from "react";
import Drawer from "./Drawer";
import uniqid from "uniqid";
import { Flex, Heading, Text, Table, Tbody, Tr, Td } from "@chakra-ui/react";

const GENERAL_ACTIONS = [
  ["Income", "Take 1 coin"],
  ["Foreign Aid", "Take 2 coins"],
  [
    "Coup",
    "Pay 7 coins",
    "Choose a player and guess a character in their hand correctly to destroy it",
  ],
];

const RulesDrawer = ({ animation }) => (
  <Drawer heading="Rules" icon="scroll" animation={animation}>
    <Flex direction="column">
      <Heading size="md" color="white">
        Basics
      </Heading>
      <Text size="sm" my={2}>
        You must always take one action
      </Text>
      <Text size="sm">
        If above 10 ISK or above you must choose to launch a coup
      </Text>

      <Heading size="md" color="white" mt={8} mb={2}>
        General Actions
      </Heading>
      <Table variant="unstyled" size="md">
        <Tbody>
          {GENERAL_ACTIONS.map((rule) => {
            return (
              <Tr key={uniqid()}>
                <Td
                  pl={0}
                  py={3}
                  pr={6}
                  verticalAlign="top"
                  whiteSpace="nowrap"
                >
                  {rule[0]}
                </Td>
                <Td px={0} py={3} verticalAlign="top">
                  <Text size="sm">{rule[1]}</Text>
                  {rule.slice(2).map((description) => (
                    <Text size="xs" mt={1} key={uniqid()}>
                      {description}
                    </Text>
                  ))}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Heading size="xs" mt={8} color="white">
        Note
      </Heading>
      <Text size="sm" mt={2}>
        Some rules have been slightly modified and will differ from the original
        board game.
      </Text>
    </Flex>
  </Drawer>
);

export default RulesDrawer;
