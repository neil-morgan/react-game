import React, { useState, useEffect, useCallback } from "react";
import { Button, Wrap } from "@chakra-ui/react";
import SelectableCard from "./SelectableCard";
import { checkAllDidAllow } from "../../../../environment/actions/helper";
import SelectorModal from "./SelectorModal";
import { cards } from "../../../../environment/cards";

const CardSelector = ({ G, ctx, playerID, moves }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selection, setSelection] = useState([]);
  const [options, setCardOptions] = useState([]);

  const coup = (character) => moves.coup(character);
  const setHand = (cardID) => moves.setHand(cardID);

  const handleConfirmClick = () => {
    switch (actionType) {
      case "exchange":
        selection.forEach((id) => setHand(id));
        break;
      case "coup":
        console.log(selection);
        break;
      default:
        null;
    }

    // setIsOpen(false);
  };

  const handleSelectionClick = (id) =>
    selection.includes(id)
      ? setSelection(selection.filter((item) => item !== id))
      : selection.length <= 1 &&
        setSelection(
          selection.length === 0
            ? [id]
            : (oldSelection) => [...oldSelection, id]
        );

  const exchangeAction = useCallback(() => {
    setActionType("exchange");
    setCardOptions([
      ...G.players[playerID].hand,
      ...G.turnLog.exchange.drawnCards,
    ]);
    checkAllDidAllow(G) && setIsOpen(true);
  }, [G, playerID]);

  const coupAction = useCallback(() => {
    setActionType("coup");
    setCardOptions(cards);
    setIsOpen(true);
  }, []);

  console.log(options);

  useEffect(() => {
    if (playerID === ctx.currentPlayer && selection.length === 0) {
      switch (G.turnLog.action) {
        case "exchange":
          exchangeAction();
          break;
        case "coup":
          coupAction();
          break;
        default:
          null;
      }
    }
  }, [G, ctx, playerID, selection, coupAction, exchangeAction]);

  useEffect(() => G.turnLog.action === "" && setSelection([]), [G]);

  return (
    <SelectorModal isOpen={isOpen}>
      <Wrap m="auto" justify="center">
        {options.length > 0 &&
          options.map(({ front, character, id }, index) => (
            <SelectableCard
              key={index}
              src={front}
              alt={character}
              disable={selection.length === 2 && !selection.includes(id)}
              selected={selection.includes(id)}
              onClick={() => handleSelectionClick(id)}
            />
          ))}
      </Wrap>
      <Button
        colorScheme="primary"
        alignSelf="center"
        mt={8}
        onClick={() => handleConfirmClick()}
        disabled={selection.length < 2}
      >
        CONFIRM
      </Button>
    </SelectorModal>
  );
};

export default CardSelector;
