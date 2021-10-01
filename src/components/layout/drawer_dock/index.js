import { Flex, Stack } from "@chakra-ui/react";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { MotionBox } from "../..";
import { drawerItemsAnimation } from "../../../animations";

const drawerItems = [CharacterDrawer, RulesDrawer];

const DrawerDock = () => (
  <Flex
    as="nav"
    w={{ base: "full", md: "55px" }}
    justify={{ base: "flex-end", md: "center" }}
    p={2}
    borderLeftWidth={{ base: 0, md: 1 }}
    borderTopWidth={{ base: 1, md: 0 }}
    borderColor="base.900"
    bg="base.d400"
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

export default DrawerDock;
