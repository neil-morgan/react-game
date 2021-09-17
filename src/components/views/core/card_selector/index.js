import React, { useState, useEffect, useCallback } from "react";
import { Button, Wrap } from "@chakra-ui/react";
import SelectableCard from "./SelectableCard";
import { checkAllDidAllow } from "../../../../environment/actions/helper";
import SelectorModal from "./SelectorModal";
import { cards } from "../../../../environment/cards";
import { isObjectEmpty } from "../../../../utils";

const CardSelector = ({ G, ctx, playerID, moves }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [maxSelection, setMaxSelection] = useState(2);
  const [selection, setSelection] = useState([]);
  const [options, setOptions] = useState([]);

  const isYourTurn = playerID === ctx.currentPlayer;

  const coup = (character) => moves.coup(character);
  const setBlock = (character) => moves.block(playerID, character);
  const setHand = (cardID) => moves.setHand(cardID);

  const handleConfirmClick = () => {
    switch (actionType) {
      case "exchange":
        selection.forEach((id) => setHand(id));
        break;
      case "coup":
        coup(options[selection].character);
        break;
      case "steal":
        setBlock(options[selection].character);
        break;
    }
    setIsOpen(false);
  };

  const handleCardSelectionClick = (id) =>
    selection.includes(id)
      ? setSelection(selection.filter((item) => item !== id))
      : selection.length <= 1 &&
        setSelection(
          selection.length === 0
            ? [id]
            : (oldSelection) => [...oldSelection, id]
        );

  const executeCoup = useCallback(() => {
    if (!isYourTurn) {
      return;
    }
    setActionType(G.turnLog.action);
    setMaxSelection(1);
    setOptions(cards);
    !isObjectEmpty(G.turnLog.target) && setIsOpen(true);
  }, [G.turnLog.target, G.turnLog.action, isYourTurn]);

  const executeExchange = useCallback(() => {
    if (!isYourTurn) {
      return;
    }
    setActionType(G.turnLog.action);
    setMaxSelection(
      G.players[playerID].hand.filter((card) => !card.discarded).length
    );
    setOptions([...G.players[playerID].hand, ...G.turnLog.exchange.drawnCards]);
    checkAllDidAllow(G) && setIsOpen(true);
  }, [G, playerID, isYourTurn]);

  const executeSteal = useCallback(() => {
    setActionType(G.turnLog.action);
    setOptions([cards[2], cards[3]]);
    setMaxSelection(1);
    if (
      Object.keys(G.turnLog.blockedBy).length !== 0 &&
      G.turnLog.blockedBy.character === "" &&
      ctx.activePlayers[playerID] === "blockOrChallenge"
    ) {
      setIsOpen(true);
    }
  }, [G.turnLog.blockedBy, G.turnLog.action, ctx.activePlayers, playerID]);

  useEffect(() => {
    if (selection.length === 0) {
      switch (G.turnLog.action) {
        case "exchange":
          executeExchange();
          break;
        case "coup":
          executeCoup();
          break;
        case "steal":
          executeSteal();
          break;
      }
    }
  }, [
    playerID,
    G.turnLog.blockedBy,
    G.turnLog.action,
    selection.length,
    executeCoup,
    executeExchange,
    executeSteal,
  ]);

  useEffect(() => G.turnLog.action === "" && setSelection([]), [G]);

  return (
    <SelectorModal isOpen={isOpen}>
      <Wrap m="auto" justify="center">
        {options.length > 0 &&
          options.map(({ front, character }, index) => (
            <SelectableCard
              key={index}
              src={front}
              alt={character}
              disable={
                selection.length === maxSelection && !selection.includes(index)
              }
              selected={selection.includes(index)}
              onClick={() => handleCardSelectionClick(index)}
            />
          ))}
      </Wrap>
      <Button
        colorScheme="primary"
        alignSelf="center"
        mt={8}
        onClick={() => handleConfirmClick()}
        disabled={selection.length < maxSelection}
      >
        CONFIRM
      </Button>
    </SelectorModal>
  );
};

export default CardSelector;
