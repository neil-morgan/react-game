import { Flex, Heading } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import {
  CardWrapper,
  DeadCard,
  IskCounter,
  LiveCard,
  PlayerWrapper,
} from "../../../";

const Profile = ({ G, ctx, playerID, moves }) => {
  const player = G.players[playerID];
  const isYourTurn = playerID === ctx.currentPlayer;
  const gameOver = G.winner.id !== "-1";

  let cardSelectable =
    (Object.prototype.hasOwnProperty.call(G.turnLog.exchange, "newHand") &&
      ctx.activePlayers[playerID] === "action") ||
    (ctx.activePlayers[playerID] &&
      ctx.activePlayers[playerID].includes("lose"));
  let cardSelected = false;
  // for exchange
  if (ctx.activePlayers[playerID] === "revealCard") {
    cardSelectable = Object.keys(G.turnLog.challenge.loser).length === 0;
    cardSelected = !cardSelectable;
  }

  const revealCard = (playerID, cardID) => moves.revealCard(playerID, cardID);

  const loseCard = (playerID, cardID) =>
    moves.loseCardAndShuffle(playerID, cardID);

  const setHand = (cardID) => moves.setHand(cardID);

  /* animation/styling stuff */

  let animate = "";
  if (player.isOut) {
    animate = "your-player-out";
  } else if (gameOver) {
    animate = "your-player-winner";
  } else if (isYourTurn) {
    animate = "your-player-enter";
  } else {
    animate = "your-player-inactive";
  }

  // little icon to indicate your counterresponse
  let iconColor = "";
  if (G.turnLog.responses[playerID] === "allow") {
    iconColor = "#008000";
  } else if (G.turnLog.responses[playerID] === "block") {
    iconColor = "#8b0000";
  } else if (G.turnLog.responses[playerID] === "challenge") {
    iconColor = "#42526C";
  }

  const getBottomRow = (status, icon) => (
    <>
      {icon}&nbsp;({status})&nbsp;{icon}
    </>
  );

  const bottomRow = () => {
    if (G.gameOver.playAgain.includes(playerID)) {
      return getBottomRow("ready", "open icon");
    } else if (G.gameOver.left.includes(playerID)) {
      return getBottomRow("left", "close icon");
    } else if (player.isOut) {
      return getBottomRow("exiled", "death icon");
    } else {
      return getBottomRow("winner", "winner icon");
    }
  };

  return (
    <PlayerWrapper player={player}>
      {player.hand.map((card, index) => (
        <CardWrapper key={index}>
          <AnimatePresence exitBeforeEnter initial={false}>
            {!card.discarded ? (
              <LiveCard
                key="live-card"
                src={card.front}
                alt={card.character}
                onClick={() => {
                  if (
                    ctx.activePlayers[playerID] &&
                    ctx.activePlayers[playerID].includes("lose") &&
                    !card.discarded
                  ) {
                    loseCard(playerID, card.id);
                  } else if (
                    Object.prototype.hasOwnProperty.call(
                      G.turnLog.exchange,
                      "newHand"
                    ) &&
                    isYourTurn
                  ) {
                    setHand(card.id);
                  } else if (cardSelectable && !card.discarded) {
                    revealCard(playerID, card.id);
                  }
                }}
              />
            ) : (
              <DeadCard key="dead-card" />
            )}
          </AnimatePresence>
        </CardWrapper>
      ))}

      {player.isOut || gameOver ? (
        <div className="exiled-text">{bottomRow()}</div>
      ) : (
        <div className="coin-row no-gutters">
          <div
            className="w-50 h-100 d-flex align-items-center justify-content-end"
            style={{ paddingRight: "1%" }}
          ></div>
          <div
            className="w-50 d-flex align-items-center justify-content-start"
            style={{ paddingLeft: "1.2%", fontSize: "2.8vw" }}
          >
            <div
              className="response-icon"
              style={{ paddingRight: "1vw", color: `${iconColor}` }}
            >
              {G.turnLog.responses[playerID] !== ""
                ? G.turnLog.responses[playerID] === "allow"
                  ? "thumb up icon"
                  : "thumb down icon"
                : ""}
            </div>
          </div>
        </div>
      )}
    </PlayerWrapper>
  );
};

export default Profile;
