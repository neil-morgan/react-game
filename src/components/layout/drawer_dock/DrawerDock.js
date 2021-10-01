import { Flex, Stack } from "@chakra-ui/react";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { MotionBox } from "../../";
import { drawerItemsAnimation } from "../../../animations";

const drawerItems = [CharacterDrawer, RulesDrawer];

const DrawerDock = () => {
  return (
    <Flex
      as="nav"
      w={{ base: "full", md: "55px" }}
      justify={{ base: "flex-end", md: "center" }}
      p={2}
      // bg="base.d400"
      bg="red.500"
    >
      <MotionBox
        direction={{ base: "row-reverse", md: "column" }}
        as={Stack}
        variants={drawerItemsAnimation.parent}
        initial="hidden"
        animate="show"
        spacing={3}
      >
        {drawerItems.map((Component, index) => (
          <Component key={index} animation={drawerItemsAnimation.animation} />
        ))}
      </MotionBox>
    </Flex>
  );
};

export default DrawerDock;
