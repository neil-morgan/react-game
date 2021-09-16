import React, { useState, useEffect, useContext } from "react";
import { CommentatorContext } from "../../../../contexts";
import { Flex, Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { capitalize } from "../../../../utils";
import { MotionBox } from "../../../";
import { textUpdate } from "../../../../animations";

const Commentator = () => {
  const { commentatorState } = useContext(CommentatorContext);
  const { G, ctx, moves, playerID } = commentatorState;
  const [msg, setMsg] = useState("");
  const [msgLoading, setMsgLoading] = useState(true);

  const isYourTurn = playerID === ctx.currentPlayer;
  const name = isYourTurn ? "you" : `${G.players[ctx.currentPlayer].name}`;

  // display at beginning of turn
  useEffect(() => {
    setMsg(
      isYourTurn ? `${capitalize(name)}r turn` : `${capitalize(name)}'s turn`
    );
    setMsgLoading(true);
  }, [ctx.currentPlayer, isYourTurn, name]);

  const hand = G.players[playerID].hand;

  // bulk of announcements happen here (i.e. the middle of the turn):
  useEffect(() => {
    const playerTargetedActions = ["coup", "assassinate", "steal"];
    let timer;

    // on successful assassination
    if (ctx.activePlayers[G.turnLog.target.id] === "loseAssassinate") {
      if (G.turnLog.target.id === playerID) {
        setMsg("Choose an influence to give up (assassinated).");
        setMsgLoading(false);
      } else {
        setMsg(
          `Waiting for ${G.turnLog.target.name} to give up an influence (assassinated)`
        );
        setMsgLoading(true);
      }
    }

    // on successful exchange
    else if (
      G.turnLog.successful &&
      G.turnLog.action === "exchange" &&
      ctx.activePlayers[ctx.currentPlayer] === "action"
    ) {
      if (G.turnLog.player.id === playerID) {
        const numToChoose = hand.filter((card) => !card.discarded).length;
        setMsg(
          `Select ${numToChoose} card${
            numToChoose === 2 ? "s" : ""
          } from the options to form your new hand.`
        );
        setMsgLoading(false);
      } else {
        setMsg(`Waiting for ${G.turnLog.player.name} to complete the exchange`);
        setMsgLoading(true);
      }
    }

    // on challenge
    else if (Object.keys(G.turnLog.challenge).length !== 0) {
      const isChallenger = G.turnLog.challenge.challenger.id === playerID;
      const challengeCharacters =
        G.turnLog.challenge.characters.length === 1
          ? `${G.turnLog.challenge.characters[0]}`
          : `${G.turnLog.challenge.characters[0]} or ${G.turnLog.challenge.characters[1]}`;
      // right after challenge
      if (Object.keys(G.turnLog.challenge.loser).length === 0) {
        if (G.turnLog.challenge.challenged.id === playerID) {
          setMsg(
            `${G.turnLog.challenge.challenger.name} challenges!\n Reveal ${challengeCharacters} or give up a card.`
          );
          setMsgLoading(false);
        } else {
          setMsg(
            `${
              isChallenger ? "You" : G.turnLog.challenge.challenger.name
            } challenge${isChallenger ? "" : "s"}!\n Waiting for ${
              G.turnLog.challenge.challenged.name
            }'s response`
          );
          setMsgLoading(true);
        }
      }
      // after deciding loser of the challenge
      else {
        if (ctx.activePlayers[G.turnLog.challenge.loser.id] === "loseCard") {
          if (G.turnLog.challenge.loser.id === playerID) {
            setMsg("Choose an influence to give up (challenge lost).");
            setMsgLoading(false);
          } else {
            setMsg(
              `${
                G.turnLog.challenge.challenged.id === playerID
                  ? `Your new card is ${G.turnLog.challenge.swapCard.character}.\n`
                  : ""
              }Waiting for ${
                G.turnLog.challenge.challenger.name
              } to give up an influence`
            );
            setMsgLoading(true);
          }
        }
        // challenge succeeds
        else if (G.turnLog.challenge.successful) {
          setMsg(
            `${
              G.turnLog.challenge.challenger.id === playerID
                ? "Your"
                : `${G.turnLog.challenge.challenger.name}'s`
            } challenge succeeds.`
          );
          setMsgLoading(false);
          timer = setTimeout(() => {
            // timer to allow players time to read announcements, but also advance the game "automatically" when necessary
            if (G.turnLog.challenge.challenged.id === playerID) {
              if (G.turnLog.action === "steal") {
                if (Object.keys(G.turnLog.blockedBy).length !== 0) {
                  moves.executeAction();
                }
                moves.endTurn();
              } else if (
                (G.turnLog.action === "assassinate" &&
                  playerID === G.turnLog.target.id) ||
                Object.keys(G.turnLog.blockedBy).length !== 0
              ) {
                moves.executeAction();
              } else {
                moves.endTurn();
              }
            }
          }, 2000);
        }
        // challenge fails
        else {
          if (G.turnLog.challenge.challenged.id === playerID) {
            setMsg(
              `You reveal ${G.turnLog.challenge.revealedCard.name}.\n${G.turnLog.challenge.challenger.name}'s challenge fails!`
            );
          } else {
            setMsg(
              `${G.turnLog.challenge.challenged.name} reveals ${
                G.turnLog.challenge.revealedCard.name
              }.\n${
                G.turnLog.challenge.challenger.id === playerID
                  ? "Your"
                  : `${G.turnLog.challenge.challenger.name}'s`
              } challenge fails!`
            );
          }
          setMsgLoading(false);
          if (
            Object.prototype.hasOwnProperty.call(
              ctx.activePlayers,
              G.turnLog.challenge.challenged.id
            )
          ) {
            timer = setTimeout(() => {
              // timer to allow players time to read announcements, but also advance the game "automatically" when necessary
              if (G.turnLog.challenge.challenged.id === playerID) {
                if (
                  G.turnLog.action !== "exchange" &&
                  G.turnLog.action !== "assassinate" &&
                  Object.keys(G.turnLog.blockedBy).length === 0
                ) {
                  moves.executeAction();
                }
                moves.continueTurn();
              }
            }, 3000);
          }
        }
      }
    }

    // on block
    else if (Object.keys(G.turnLog.blockedBy).length !== 0) {
      const blocksWith =
        Object.prototype.hasOwnProperty.call(
          G.turnLog.blockedBy,
          "character"
        ) && G.turnLog.blockedBy.character !== "";
      if (
        G.turnLog.action === "steal" &&
        G.turnLog.blockedBy.character === ""
      ) {
        if (playerID === G.turnLog.blockedBy.id) {
          setMsg("Choose a character to block with.");
          setMsgLoading(false);
        }
      } else if (!isYourTurn) {
        let blockedMsg =
          G.turnLog.blockedBy.id === playerID
            ? `You block`
            : `${G.turnLog.blockedBy.name} blocks`;
        if (blocksWith) {
          blockedMsg += ` with ${G.turnLog.blockedBy.character}`;
        }
        blockedMsg += "!";
        setMsg(
          `${blockedMsg}\nwaiting for ${
            blocksWith ? "a" : `${name}'s`
          } response`
        );
        setMsgLoading(true);
      } else {
        setMsg(
          `${G.turnLog.blockedBy.name} blocks your ${
            G.turnLog.action === "assassinate"
              ? "assassination"
              : G.turnLog.action
          }${blocksWith ? ` with ${G.turnLog.blockedBy.character}` : ""}.`
        );
        setMsgLoading(false);
      }
    }

    // targetable actions i.e. coup, assassinate, steal
    else if (playerTargetedActions.includes(G.turnLog.action)) {
      let action =
        G.turnLog.action === "steal" ? "steal from" : G.turnLog.action;
      if (!isYourTurn) {
        if (Object.keys(G.turnLog.target).length === 0) {
          setMsg(`${name} is choosing someone to ${action}`);
          setMsgLoading(true);
        } else {
          if (G.turnLog.action === "coup") {
            setMsg(
              `${name} initiates a coup against ${
                G.turnLog.target.id === playerID ? "you" : G.turnLog.target.name
              }`
            );
            setMsgLoading(true);
          } else {
            if (G.turnLog.target.id === playerID) {
              setMsg(`${name} chooses to ${action} you.`);
              setMsgLoading(false);
            } else {
              action =
                G.turnLog.action === "steal" ? "steals from" : action + "s";
              setMsg(
                `${name} ${action} ${G.turnLog.target.name}.\nwaiting for a response`
              );
              setMsgLoading(true);
            }
          }
        }
      } else if (Object.keys(G.turnLog.target).length === 0) {
        setMsg(`Choose a player to ${action}.`);
        setMsgLoading(false);
      } else if (G.turnLog.action === "coup") {
        setMsg("Select a character to coup.");
        setMsgLoading(false);
      } else {
        setMsg(`Waiting for ${G.turnLog.target.name} to respond`);
        setMsgLoading(true);
      }
    }

    // any blockable or challengable action (trying to generalize when I can)
    else if (ctx.activePlayers[ctx.currentPlayer] !== "action") {
      if (!isYourTurn) {
        setMsg(`${name} attempts to ${G.turnLog.action}.`);
        setMsgLoading(false);
      } else {
        setMsg(`Waiting for others to respond`);
      }
    }

    if (timer) {
      return () => clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  }, [
    G.turnLog,
    ctx.activePlayers,
    ctx.currentPlayer,
    moves,
    hand,
    isYourTurn,
    name,
    playerID,
  ]);

  // on game over
  useEffect(() => {
    if (G.winner.id !== "-1") {
      setMsg(
        `Game over!\n${name} ${
          G.winner.id === playerID ? "are" : "is"
        } the winner.`
      );
      setMsgLoading(false);
    }
  }, [G.winner, name, playerID]);

  return (
    <>
      <Flex w="full" textAlign="center" position="relative" h="100px">
        <AnimatePresence>
          <MotionBox
            position="absolute"
            top="50%"
            left="50%"
            w="full"
            as={Heading}
            key={msg}
            color="white"
            size="lg"
            letterSpacing="wider"
            {...textUpdate}
          >
            {msg}
          </MotionBox>
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default Commentator;
