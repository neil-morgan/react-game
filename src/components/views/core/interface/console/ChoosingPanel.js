import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { cards } from "../../../../../environment/cards";
import { api } from "../../../../../server/api";

const ChoosingPanel = ({ G, ctx, playerID, moves, gameID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [choices, setChoices] = useState([]);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (G.gameOver.newRoomID !== "") {
      const myID = localStorage.getItem("id");
      const myCredentials = localStorage.getItem("credentials");
      const myName = localStorage.getItem("name");
      api.leaveRoom(gameID, myID, myCredentials).then(() => {
        api.joinRoom(G.gameOver.newRoomID, myID, myName).then((credentials) => {
          localStorage.setItem("credentials", credentials);
          window.location.href = "/rooms/" + G.gameOver.newRoomID;
        });
      });
    }
  }, [G.gameOver.newRoomID, gameID]);

  useEffect(() => {
    if (G.gameOver.playAgain.length === ctx.numPlayers) {
      if (G.gameOver.newRoomID === "" && playerID === G.gameOver.playAgain[0]) {
        api.createRoom(ctx.numPlayers).then((roomID) => {
          moves.setNewRoom(roomID);
        });
      }
    }

    const isYourTurn = playerID === ctx.currentPlayer;

    const coup = (character) => moves.coup(character);
    const setHand = (cardID) => moves.setHand(cardID);
    const setBlock = (character) => moves.block(playerID, character);
    const playAgain = () => moves.playAgain(playerID);

    const leaveRoom = () => {
      moves.leave(playerID);
      api
        .leaveRoom(
          gameID,
          localStorage.getItem("id"),
          localStorage.getItem("credentials")
        )
        .then(() => {
          // leaving clears your localStorage to "reset" your identity and then takes you to homepage
          localStorage.clear();
          window.location.href = "/";
        });
    };

    let temp = [];

    // TODO: let players leave anytime (AKA they are "out" to the other players to skip over leaving player's turn)
    // game has ended: let players leave.
    if (G.winner.id !== "-1") {
      document.getElementById("choosing_panel").style.flexDirection = "column";
      document.getElementById("choosing_panel").style.alignItems = "center";
      document.getElementById("choosing_panel").style.justifyContent =
        "flex-start";
      let secondClassName = "";
      if (G.gameOver.left.length !== 0) {
        secondClassName = "play-again-disabled";
      } else if (G.gameOver.playAgain.includes(playerID)) {
        secondClassName = "play-again-selected";
      }
      temp.push(
        <Button
          key={uniqid()}
          className={`play-again-btn ${secondClassName}`}
          onClick={playAgain}
          disabled={
            G.gameOver.left.length !== 0 ||
            G.gameOver.playAgain.includes(playerID)
          }
        >
          play again [
          {G.gameOver.left.length !== 0
            ? "N/A"
            : `${G.gameOver.playAgain.length}/${ctx.numPlayers}`}
          ]
        </Button>
      );
      temp.push(
        <Button key={uniqid()} className="leave-btn" onClick={leaveRoom}>
          leave
        </Button>
      );
    }
    // for blocking steal: show character choices that can block steal (ambassador, captain)
    else if (
      G.turnLog.action === "steal" &&
      Object.keys(G.turnLog.blockedBy).length !== 0 &&
      G.turnLog.blockedBy.character === "" &&
      ctx.activePlayers[playerID] === "blockOrChallenge"
    ) {
      temp.push(
        <img
          key={uniqid()}
          className="character-choice"
          onClick={() => setBlock("Ambassador")}
          src={"/images/ambassador.PNG"}
          alt={"Ambassador"}
        />
      );
      temp.push(
        <img
          key={uniqid()}
          className="character-choice"
          onClick={() => setBlock("Captain")}
          src={"/images/captain.PNG"}
          alt={"Captain"}
        />
      );
    }
    // for coup: show all possible cards to select a targeted character
    else if (G.turnLog.action === "coup" && isYourTurn) {
      // image loading optimization (with hidden)
      cards.forEach((card) => {
        temp.push(
          <img
            key={uniqid()}
            className="character-choice"
            onClick={() => {
              coup(card.character);
              handleClose();
            }}
            src={card.front}
            alt={card.character}
            hidden={Object.keys(G.turnLog.target).length === 0}
          />
        );
      });
    }
    // show the top two cards
    else if (G.turnLog.action === "exchange" && isYourTurn) {
      // image loading optimization with hidden
      G.turnLog.exchange.drawnCards.forEach((card) => {
        const cardSelected =
          Object.prototype.hasOwnProperty.call(G.turnLog.exchange, "newHand") &&
          G.turnLog.exchange.newHand.includes(card.id);
        temp.push(
          <img
            key={"choice" + card.character}
            onClick={() => {
              setHand(card.id);
            }}
            src={card.front}
            alt={card.character}
            hidden={
              !G.turnLog.successful || ctx.activePlayers[playerID] !== "action"
            }
          />
        );
      });
    }

    setChoices(temp);
  }, [
    G.turnLog,
    G.players,
    G.gameOver,
    ctx.currentPlayer,
    ctx.numPlayers,
    ctx.activePlayers,
    playerID,
    moves,
    G.winner.id,
    gameID,
  ]);

  useEffect(
    () =>
      typeof choices !== "undefined" && choices.length !== 0 && setIsOpen(true),
    [choices]
  );

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>{choices}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChoosingPanel;
