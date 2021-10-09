import React, { useRef } from "react";
import { useTransparentizedColor } from "../../../utils";
import {
  IconButton,
  Heading,
  useDisclosure,
  useToken,
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
        placement="top"
        onClose={onClose}
        finalFocusRef={openRef}
      >
        <DrawerContent
          w="calc(100% - 56px)"
          maxH="400px"
          bg={useTransparentizedColor(useToken("colors", "base.d400"), 0.95)}
          borderBottomWidth={1}
          borderColor="base.700"
          boxShadow="none"
          _after={{
            content: "''",
            position: "absolute",
            bottom: "-25px",
            left: 0,
            height: "25px",
            bgGradient: `linear(to-b, ${useTransparentizedColor(
              useToken("colors", "base.d700"),
              0.9
            )}, transparent)`,
            w: "full",
          }}
        >
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

          <DrawerBody
            p={6}
            sx={{
              "::-webkit-scrollbar": {
                width: "28px",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "primary.200",
                borderRadius: "16px",
                border: "13px solid transparent",
                backgroundClip: "content-box",
              },
            }}
          >
            {children}
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
