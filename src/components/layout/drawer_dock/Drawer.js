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
import { Icon, MotionBox } from "../..";

const Drawer = ({ children, heading, icon = "menu", animation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openRef = useRef();

  return (
    <>
      <MotionBox
        as={IconButton}
        ref={openRef}
        colorScheme="primary"
        variant="ghost"
        onClick={onOpen}
        size={{ base: "xs", lg: "lg" }}
        // variants={animation}
      >
        <Icon name={icon} boxSize={{ base: 8, lg: 10 }} />
      </MotionBox>

      <ChakraDrawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={openRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="base.d100">
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
