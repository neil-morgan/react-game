import { Tooltip, HStack } from "@chakra-ui/react";
import { MotionBox } from "../../";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { drawerDockReveal } from "../../../animations";

const DrawerDock = () => {
  return (
    <MotionBox
      as={HStack}
      position="absolute"
      top={4}
      right={4}
      spacing={3}
      {...drawerDockReveal}
    >
      <Tooltip label="Hover me">
        <CharacterDrawer />
      </Tooltip>
      <RulesDrawer />
    </MotionBox>
  );
};

export default DrawerDock;
