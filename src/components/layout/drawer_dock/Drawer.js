import React, { useRef } from "react";
import {
  IconButton,
  Heading,
  useDisclosure,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { Icon } from "../..";

const Drawer = ({ children, heading, icon = "menu" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openRef = useRef();

  return (
    <>
      <IconButton
        ref={openRef}
        colorScheme="primary"
        variant="ghost"
        onClick={onOpen}
        size="lg"
      >
        <Icon name={icon} boxSize={10} />
      </IconButton>

      <ChakraDrawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={openRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="base.900">
          <DrawerHeader
            position="relative"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottomWidth={1}
            borderColor="inherit"
          >
            <Heading color="white" size="lg">
              {heading}
            </Heading>
            <IconButton
              position="relative"
              size="md"
              colorScheme="primary"
              variant="ghost"
              top={0}
              right={0}
              onClick={onClose}
            >
              <Icon name="cross" boxSize={4} />
            </IconButton>
          </DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
