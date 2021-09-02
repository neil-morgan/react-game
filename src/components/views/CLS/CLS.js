import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import ChatLog from "./ChatLog";
import GameView from "./GameView";
import Rules from "./Rules";

const allOptions = ["chat & log", "game view", "rules"];

const ChatLogSettings = ({ G, playerID, moves, revealDeck, setRevealDeck }) => {
  const [optionIndex, setIndex] = useState(0);
  const [rulesPage, setRPage] = useState(1);

  const left = () => {
    if (optionIndex - 1 < 0) {
      setIndex(allOptions.length - 1);
    } else {
      setIndex(optionIndex - 1);
    }
  };

  const right = () => {
    if (optionIndex + 1 > allOptions.length - 1) {
      setIndex(0);
    } else {
      setIndex(optionIndex + 1);
    }
  };

  const selection = allOptions[optionIndex];

  const option = () => {
    if (selection === "chat & log") {
      return <ChatLog G={G} playerID={playerID} moves={moves} />;
    } else if (selection === "game view") {
      return (
        <GameView
          G={G}
          playerID={playerID}
          revealDeck={revealDeck}
          setRevealDeck={setRevealDeck}
        />
      );
    } else if (selection === "rules") {
      return <Rules page={rulesPage} setPage={setRPage} />;
    }
  };

  // bot message is just output of turn log's message
  return (
    <Flex position="absolute" bottom={0} right={0}>
      <div className="cls-header">
        <span className="left-option" onClick={() => left()}>
          left icon
        </span>
        <span className="cls-title">{selection}</span>
        <span className="right-option" onClick={() => right()}>
          right icon
        </span>
      </div>
      {option()}
    </Flex>
  );
};

export default ChatLogSettings;
