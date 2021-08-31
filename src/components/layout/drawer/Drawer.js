import React, { useRef } from "react";
import {
  IconButton,
  Heading,
  useDisclosure,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { Icon } from "../../";

const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        colorScheme="primary"
        variant="ghost"
        onClick={onOpen}
        position="absolute"
        top={4}
        right={6}
      >
        <Icon name="menu" boxSize={6} />
      </IconButton>

      <ChakraDrawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="base.d100">
          <DrawerHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading color="white" size="lg">
              Rules
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

          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
