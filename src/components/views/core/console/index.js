import { Flex, useMediaQuery } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";

const Console = (props) => {
  const [isPortrait] = useMediaQuery("(orientation: portrait)");

  return (
    <Flex
      p="0.5em"
      justify="space-between"
      {...getFluidFontSize()}
      {...(isPortrait
        ? {
            flexDirection: "row",
            mt: "auto",
            h: "auto",
          }
        : {
            flexDirection: "column",
            mt: 0,
            h: "full",
            alignSelf: "flex-end",
          })}
    >
      <Profile {...props} />
      <Actions {...props} />
    </Flex>
  );
};

export default Console;
