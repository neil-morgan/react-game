import { Stack } from "@chakra-ui/react";
import { MotionBox } from "../../";
import CharacterDrawer from "./CharacterDrawer";
import RulesDrawer from "./RulesDrawer";
import { drawerDockReveal } from "../../../animations";

const DrawerDock = () => {
  return (
    <MotionBox as="nav" bg="base.d400" {...drawerDockReveal} p={2}>
      <Stack
        direction={{ base: "row", md: "column" }}
        justify={{ base: "flex-end", md: "flex-start" }}
        spacing={3}
      >
        <CharacterDrawer />
        <RulesDrawer />
      </Stack>
    </MotionBox>
  );
};

export default DrawerDock;
