import { Flex, Stack } from "@chakra-ui/react";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { MotionBox } from "../../";
import { drawerItemsAnimation } from "../../../animations";

const drawerItems = [CharacterDrawer, RulesDrawer];

const DrawerDock = () => (
  <Flex
    as="nav"
    bg="base.d400"
    py={{ base: 1, lg: 2 }}
    px={2}
    justify={{ base: "flex-end", xl: "flex-start" }}
  >
    <MotionBox
      as={Stack}
      variants={drawerItemsAnimation.parent}
      initial="hidden"
      animate="show"
      direction={{ base: "row-reverse", xl: "column" }}
      spacing={3}
    >
      {drawerItems.map((Component, index) => (
        <Component key={index} animation={drawerItemsAnimation.animation} />
      ))}
    </MotionBox>
  </Flex>
);

export default DrawerDock;
