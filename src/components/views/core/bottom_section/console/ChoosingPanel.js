import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  Box,
  Wrap,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { MotionBox } from "../../../..";
import { isObjectEmpty } from "../../../../../utils";
import { cards } from "../../../../../environment/cards";
import { checkAllDidAllow } from "../../../../../environment/actions/helper";
import { api } from "../../../../../server/api";

const Card = ({ hidden, src, alt, onClick, selected }) => {
  console.log(selected);
  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
    >
      <Image
        w="200px"
        src={src}
        alt={alt}
        transform={`translateY(${selected ? "-20px" : "0px"})`}
        hidden={hidden}
      />
      <Box
        onClick={() => onClick()}
        position="absolute"
        inset={0}
        bg={selected ? "transparent" : "rgba(0,0,0,0.5)"}
        transform={`translateY(${selected ? "-20px" : "0px"})`}
        cursor="pointer"
        transition="ease 250ms"
        _hover={{ bg: selected ? "transparent" : "rgba(0,0,0,0.25)" }}
      />
    </MotionBox>
  );
};

const ChoosingPanel = ({ G, ctx, playerID, moves, gameID, msg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [choices, setChoices] = useState([]);
  const [newHand, setNewHand] = useState([]);

  //!CREATE THE NEW HAND AND THEN WHEN ARR LENGTH === 2 LOOP AND CALL SET HAND FOR EACH ITERATION

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

    const isYourTurn = playerID === ctx.currentPlayer;

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
        <button
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
        </button>
      );
      temp.push(
        <button key={uniqid()} className="leave-btn" onClick={leaveRoom}>
          leave
        </button>
      );
    }
    // for blocking steal: show character choices that can block steal (ambassador, captain)
    else if (
      G.turnLog.action === "steal" &&
      Object.keys(G.turnLog.blockedBy).length !== 0 &&
      G.turnLog.blockedBy.character === "" &&
      ctx.activePlayers[playerID] === "blockOrChallenge"
    ) {
      setIsOpen(true);
      temp.push(
        <Card
          src={"/images/ambassador.PNG"}
          alt={"Ambassador"}
          onClick={() => {
            setBlock("Ambassador");
            handleClose();
          }}
        />
      );
      temp.push(
        <Card
          src={"/images/captain.PNG"}
          alt={"Captain"}
          onClick={() => {
            setBlock("Captain");
            handleClose();
          }}
        />
      );
    }
    // for coup: show all possible cards to select a targeted character
    else if (G.turnLog.action === "coup" && isYourTurn) {
      !isObjectEmpty(G.turnLog.target) && setIsOpen(true);
      // image loading optimization (with hidden)
      cards.forEach((card) => {
        temp.push(
          <Card
            src={card.front}
            alt={card.character}
            hidden={Object.keys(G.turnLog.target).length === 0}
            onClick={() => {
              coup(card.character);
              handleClose();
            }}
          />
        );
      });
    }
    // show the top two cards
    else if (G.turnLog.action === "exchange" && isYourTurn) {
      checkAllDidAllow(G) && setIsOpen(true);

      [...G.players[playerID].hand, ...G.turnLog.exchange.drawnCards].forEach(
        (card) => {
          temp.push(
            <Card
              key={uniqid()}
              src={card.front}
              alt={card.character}
              selected={newHand.includes(card.id)}
              hidden={
                !G.turnLog.successful ||
                ctx.activePlayers[playerID] !== "action"
              }
              onClick={() => {
                setNewHand((oldHand) => [...oldHand, card.id]);
                // setHand(card.id);
                // handleClose();
              }}
            />
          );
        }
      );
    }
    console.log(G.turnLog);

    setChoices(temp);
  }, [
    G,
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
    newHand, //!TRACKING PROPS HERE CAUSES ENTIRE RERENDER (FLASH OF CARDS AND TEXT)
  ]);

  //NEED TO TRY AND MOVE CERTAIN PARTS OUT OF USEEFFECT AND TRACK IN STATE

  return (
    <Modal isOpen={isOpen} size="full" motionPreset="scale">
      <ModalContent bg="base.d400">
        <MotionBox
          as={ModalHeader}
          my="auto"
          textAlign="center"
          color="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.25, duration: 0.5 } }}
        >
          {msg}
        </MotionBox>
        <ModalBody display="flex" flex={0} mb="auto">
          <Wrap m="auto" justify="center">
            {choices}
          </Wrap>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChoosingPanel;
