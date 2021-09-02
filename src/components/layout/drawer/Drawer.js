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
  const openRef = useRef();

  return (
    <>
      <IconButton
        ref={openRef}
        colorScheme="primary"
        variant="ghost"
        onClick={onOpen}
        position="absolute"
        top={4}
        right={6}
      >
        <Icon name="menu" boxSize={7} />
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
