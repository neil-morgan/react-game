import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Wrap,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import CardSelection from "./CardSelection";
import { MotionBox } from "../../..";
import { checkAllDidAllow } from "../../../../environment/actions/helper";

const Exchange = ({ G, ctx, playerID, moves, msg }) => {
  const [heading, setHeading] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [options, setCardOptions] = useState([]);

  const setHand = (cardID) => moves.setHand(cardID);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const handleSelectionClick = (id) =>
    selection.includes(id)
      ? setSelection(selection.filter((item) => item !== id))
      : selection.length <= 1 &&
        setSelection(
          0 === selection.length
            ? [id]
            : (oldSelection) => [...oldSelection, id]
        );

  const handleConfirmClick = () => {
    selection.forEach((id) => setHand(id));
    handleClose();
  };

  useEffect(() => {
    setHeading(msg);
    const isYourTurn = playerID === ctx.currentPlayer;

    if (G.turnLog.action === "exchange" && isYourTurn) {
      setCardOptions([
        ...G.players[playerID].hand,
        ...G.turnLog.exchange.drawnCards,
      ]);
      checkAllDidAllow(G) && selection.length === 0 && handleOpen();
    }
  }, [G, ctx.activePlayers, ctx.currentPlayer, selection, playerID, msg]);

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
          {heading}
        </MotionBox>
        <ModalBody
          display="flex"
          flexDirection="column"
          flex={0}
          mb="auto"
          minH="330px"
        >
          <Wrap m="auto" justify="center">
            {options.length > 0 &&
              options.map(({ front, character, id }, index) => {
                return (
                  <CardSelection
                    key={index}
                    src={front}
                    alt={character}
                    selected={selection.includes(id)}
                    onClick={() => handleSelectionClick(id)}
                    hidden={
                      !G.turnLog.successful ||
                      ctx.activePlayers[playerID] !== "action"
                    }
                  />
                );
              })}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Exchange;
