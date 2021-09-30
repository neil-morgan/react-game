import { Flex } from "@chakra-ui/react";
import { getFluidFontSize } from "../../../../utils";
import Actions from "./Actions";
import Profile from "./Profile";

const Console = (props) => {
  const { isLandscape, isMobile } = props.media;

  return (
    <Flex
      as="section"
      p="0.6em"
      justify="space-between"
      {...getFluidFontSize()}
      {...(isMobile
        ? isLandscape
          ? {
              flexDirection: "column",
              mt: 0,
              h: "full",
              alignSelf: "flex-end",
            }
          : {
              flexDirection: "row",
              h: "auto",
            }
        : {
            flexDirection: "row",
          })}
    >
      <Profile {...props} />
      <Actions {...props} />
    </Flex>
  );
};

export default Console;
