import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@chakra-ui/react";
import Commentator from "../commentator";

const SelectorModal = ({ isOpen, children, commentatorProps }) => (
  <Modal isOpen={isOpen} size="full" motionPreset="scale">
    <ModalContent bg="base.d400">
      <ModalHeader my="auto" textAlign="center" color="white">
        <Commentator {...commentatorProps} />
      </ModalHeader>
      <ModalBody
        display="flex"
        flexDirection="column"
        flex={0}
        mb="auto"
        minH="330px"
      >
        {children}
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default SelectorModal;
