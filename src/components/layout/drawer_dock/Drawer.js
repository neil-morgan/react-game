import React, { useRef } from "react";
import {
  Tooltip,
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
      <Tooltip
        label={heading.toLowerCase()}
        bg="transparent"
        color="primary.300"
        placement="left"
        fontSize="xs"
      >
        <IconButton
          ref={openRef}
          colorScheme="primary"
          variant="ghost"
          onClick={onOpen}
          size="lg"
        >
          <Icon name={icon} boxSize={10} />
        </IconButton>
      </Tooltip>

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
            borderColor="base.700"
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

          <DrawerBody p={6}>{children}</DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
