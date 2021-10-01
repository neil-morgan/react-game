import { useEffect } from "react";
import {
  useMediaQuery,
  useTheme,
  Progress,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

import { useBoundingRect } from "../../../hooks";
import { percentage } from "../../../utils";
import { Icon } from "../../";

const Slider = ({
  setTrackIsActive,
  setMultiplier,
  setActiveItem,
  setConstraint,
  setItemWidth,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap,
}) => {
  const { breakpoints } = useTheme();

  const [sliderRef, { width }] = useBoundingRect();

  const [isBetweenBaseAndMd] = useMediaQuery(
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.md})`
  );
  const [isBetweenMdAndXl] = useMediaQuery(
    `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.xl})`
  );
  const [isGreaterThanXL] = useMediaQuery(`(min-width: ${breakpoints.xl})`);

  const handleFocus = () => setTrackIsActive(true);

  const handleDecrementClick = () => {
    setTrackIsActive(true);
    !(activeItem === positions.length - positions.length) &&
      setActiveItem((prev) => prev - 1);
  };

  const handleIncrementClick = () => {
    setTrackIsActive(true);
    !(activeItem === positions.length - constraint) &&
      setActiveItem((prev) => prev + 1);
  };

  useEffect(() => {
    if (isBetweenBaseAndMd) {
      setItemWidth(Math.round(width));
      setMultiplier(0.65);
      setConstraint(1);
    }
    if (isBetweenMdAndXl) {
      setItemWidth(Math.round(width) / 2);
      setMultiplier(0.5);
      setConstraint(2);
    }
    if (isGreaterThanXL) {
      setItemWidth(Math.round(width) / 3);
      setMultiplier(0.35);
      setConstraint(3);
    }
  }, [
    isBetweenBaseAndMd,
    isBetweenMdAndXl,
    isGreaterThanXL,
    setMultiplier,
    setConstraint,
    setItemWidth,
    itemWidth,
    width,
  ]);

  return (
    <Box p={gap}>
      <Box ref={sliderRef} w="full" position="relative" overflow="hidden">
        {children}
      </Box>

      <Flex w={`${itemWidth}px`} mt={gap} mx="auto">
        <Button
          onClick={handleDecrementClick}
          onFocus={handleFocus}
          color="gray.200"
          variant="link"
          minW={0}
        >
          <Icon name="chevron_left" boxSize={9} />
        </Button>

        <Progress
          value={percentage(activeItem, positions.length - constraint)}
          transition="ease 250ms"
          alignSelf="center"
          borderRadius="2px"
          bg="base.d100"
          flex={1}
          h="3px"
          sx={{
            "> div": {
              backgroundColor: "gray.400",
            },
          }}
        />

        <Button
          onClick={handleIncrementClick}
          onFocus={handleFocus}
          color="gray.200"
          variant="link"
          zIndex={2}
          minW={0}
        >
          <Icon name="chevron_right" boxSize={9} />
        </Button>
      </Flex>
    </Box>
  );
};

export default Slider;
