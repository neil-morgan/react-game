import { VStack } from "@chakra-ui/react";
import { MotionBox } from "../../";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { drawerDockReveal } from "../../../animations";

const DrawerDock = () => {
  return (
    <MotionBox
      as="nav"
      position="absolute"
      top={4}
      right={4}
      zIndex={1}
      {...drawerDockReveal}
    >
      <VStack spacing={3}>
        <CharacterDrawer />
        <RulesDrawer />
      </VStack>
    </MotionBox>
  );
};

export default DrawerDock;
