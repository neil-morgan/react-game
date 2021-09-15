import React, { useState, useEffect } from "react";
import { Button, Wrap } from "@chakra-ui/react";
import SelectableCard from "./SelectableCard";
import { checkAllDidAllow } from "../../../../environment/actions/helper";
import SelectorModal from "./SelectorModal";

const Exchange = ({ G, ctx, playerID, moves }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [options, setCardOptions] = useState([]);

  const setHand = (cardID) => moves.setHand(cardID);

  const handleSelectionClick = (id) =>
    selection.includes(id)
      ? setSelection(selection.filter((item) => item !== id))
      : selection.length <= 1 &&
        setSelection(
          selection.length === 0
            ? [id]
            : (oldSelection) => [...oldSelection, id]
        );

  const handleConfirmClick = () => {
    selection.forEach((id) => setHand(id));
    setIsOpen(false);
  };

  useEffect(() => {
    if (G.turnLog.action === "exchange" && playerID === ctx.currentPlayer) {
      setCardOptions([
        ...G.players[playerID].hand,
        ...G.turnLog.exchange.drawnCards,
      ]);

      checkAllDidAllow(G) && selection.length === 0 && setIsOpen(true);
    }
  }, [G, ctx, playerID, selection]);

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
              hidden={
                !G.turnLog.successful ||
                ctx.activePlayers[playerID] !== "action"
              }
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

export default Exchange;
