import React from "react";
import uniqid from "uniqid";
import {
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const GENERAL_ACTIONS = [
  ["Income", "Take 1 coin"],
  ["Foreign Aid", "Take 2 coins"],
  [
    "Coup",
    "Pay 7 coins",
    "Choose a player and guess a character in their hand correctly to destroy it",
  ],
];

const ACTION_RULES = [
  ["Tax", "Duke", "Take 3 coins"],
  [
    "Assassinate",
    "Assassin",
    "Pay 3 coins",
    "Choose player to lose a character",
  ],
  ["Steal", "Captain", "Take at most 2 coins from another player"],
  ["Exchange", "Ambassador", "Exchange hand with top 2 cards of deck"],
];

const COUNTER_RULES = [
  ["Duke", "Blocks foreign aid"],
  ["Ambassador", "Blocks stealing"],
  ["Captain", "Blocks stealing"],
  ["Contessa", "Blocks assassination"],
];

const Page1 = () => (
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
      <Thead>
        <Tr>
          <Th pl={0} py={3} pr={6}>
            Action
          </Th>
          <Th px={0} py={3}>
            Effect
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {GENERAL_ACTIONS.map((rule) => {
          return (
            <Tr key={uniqid()}>
              <Td pl={0} py={3} pr={6} verticalAlign="top" whiteSpace="nowrap">
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
);

const Page2 = () => (
  <>
    <div className="rules-desc-container">
      <div className="rules-title">Character Actions</div>
      <table className="rules-table">
        <Thead>
          <tr>
            <Th px={0}>Action</Th>
            <Th px={0}>Effect</Th>
          </tr>
        </Thead>
        <tbody>
          {ACTION_RULES.map((desc) => {
            return (
              <tr className="character-action-entry" key={uniqid()}>
                <Td px={0}>
                  {desc[0]}
                  <div className="character-footer">({desc[1]})</div>
                </Td>
                <Td px={0}>
                  <div className="action-description">
                    {desc[2]}
                    {desc.slice(3).map((extraDesc) => (
                      <span className="extra-desc" key={uniqid()}>
                        {extraDesc}
                      </span>
                    ))}
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

const Page3 = () => (
  <>
    <div className="rules-desc-container">
      <div className="rules-title">Counteractions</div>
      <table className="rules-table">
        <Thead>
          <tr>
            <Th px={0}>Character</Th>
            <Th px={0}>Counteraction</Th>
          </tr>
        </Thead>
        <tbody>
          {COUNTER_RULES.map((desc) => {
            return (
              <tr key={uniqid()}>
                <Td px={0}>{desc[0]}</Td>
                <Td px={0}>
                  <div className="action-description">
                    {desc[1]}
                    {desc.slice(2).map((extraDesc) => (
                      <span className="extra-desc" key={uniqid()}>
                        {extraDesc}
                      </span>
                    ))}
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
);

const Rules = () => (
  <>
    <Page1 />
    {/* <Page2 />
    <Page3 /> */}
  </>
);

export default Rules;
