import React, { createContext, useState } from "react";

const CommentatorContext = createContext();

const CommentatorProvider = ({ children }) => {
  const [commentatorState, setCommentatorState] = useState(defaultState);

  return (
    <CommentatorContext.Provider
      value={{
        commentatorState,
        setCommentatorState,
      }}
    >
      {children}
    </CommentatorContext.Provider>
  );
};

export { CommentatorContext, CommentatorProvider };

const defaultState = {
  ctx: {
    numPlayers: 2,
    turn: 1,
    currentPlayer: "0",
    playOrder: ["0", "1"],
    playOrderPos: 0,
    phase: null,
    activePlayers: {
      0: "action",
      1: "idle",
    },
    _activePlayersMoveLimit: null,
    _activePlayersNumMoves: {
      0: 0,
      1: 0,
    },
    _prevActivePlayers: [],
    _nextActivePlayers: null,
    numMoves: 0,
  },
  G: {
    deck: [
      {
        character: "Captain",
        front: "/images/captain.PNG",
      },
      {
        character: "Ambassador",
        front: "/images/ambassador.PNG",
      },
      {
        character: "Duke",
        front: "/images/duke.PNG",
      },
      {
        character: "Contessa",
        front: "/images/contessa.PNG",
      },
      {
        character: "Assassin",
        front: "/images/assassin.PNG",
      },
      {
        character: "Assassin",
        front: "/images/assassin.PNG",
      },
      {
        character: "Duke",
        front: "/images/duke.PNG",
      },
      {
        character: "Ambassador",
        front: "/images/ambassador.PNG",
      },
      {
        character: "Duke",
        front: "/images/duke.PNG",
      },
      {
        character: "Ambassador",
        front: "/images/ambassador.PNG",
      },
      {
        character: "Assassin",
        front: "/images/assassin.PNG",
      },
    ],
    players: [
      {
        name: "Default Player 1",
        isOut: false,
        hand: [
          {
            character: "Contessa",
            front: "/images/contessa.PNG",
            discarded: false,
            id: 0,
          },
          {
            character: "Contessa",
            front: "/images/contessa.PNG",
            discarded: false,
            id: 1,
          },
        ],
        coins: 2,
        id: "0",
      },
      {
        name: "Default Player 2",
        isOut: false,
        hand: [
          {
            character: "Captain",
            front: "/images/captain.PNG",
            discarded: false,
            id: 0,
          },
          {
            character: "Captain",
            front: "/images/captain.PNG",
            discarded: false,
            id: 1,
          },
        ],
        coins: 2,
        id: "1",
      },
    ],
    winner: {
      name: "",
      id: "-1",
    },
    gameOver: {
      playAgain: [],
      left: [],
      newRoomID: "",
    },
    turnLog: {
      action: "",
      player: {},
      successful: false,
      target: {},
      blockedBy: {},
      challenge: {},
      responses: ["", ""],
      exchange: {},
    },
    statistics: [
      ["income", 0, "—", "—", "—"],
      ["foreign aid", 0, 0, 0, "—"],
      ["coup", 0, 0, "—", "—"],
      ["tax", 0, 0, "—", 0],
      ["assassinate", 0, 0, 0, 0],
      ["steal", 0, 0, 0, 0],
      ["exchange", 0, 0, "—", 0],
    ],
    chat: [],
  },
  moves: {},
  playerID: "0",
};
