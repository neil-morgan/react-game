import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

const Item = ({
  setTrackIsActive,
  setActiveItem,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  index,
  gap,
}) => {
  const [userDidTab, setUserDidTab] = useState(false);

  const handleFocus = () => setTrackIsActive(true);

  const handleBlur = () => {
    userDidTab && index + 1 === positions.length && setTrackIsActive(false);
    setUserDidTab(false);
  };

  const handleKeyUp = (event) =>
    event.key === "Tab" &&
    !(activeItem === positions.length - constraint) &&
    setActiveItem(index);

  const handleKeyDown = (event) => event.key === "Tab" && setUserDidTab(true);

  return (
    <Flex
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      w={`${itemWidth}px`}
    >
      <Box flex={1} pl={gap} pr={gap}>
        {children}
      </Box>
    </Flex>
  );
};

export default Item;
