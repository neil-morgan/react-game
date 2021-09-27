import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";

const Console = (props) => {
  const { isLandscape, isMobile } = props.media;

  return (
    <Flex
      p="0.5em"
      justify="space-between"
      {...getFluidFontSize()}
      {...(isLandscape && isMobile
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
