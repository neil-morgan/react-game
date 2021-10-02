import { useEffect, useCallback } from "react";
import {
  useMediaQuery,
  useTheme,
  Progress,
  HStack,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";

import { useBoundingRect } from "../../../hooks";
import { percentage } from "../../../utils";
import { Icon } from "../../";

const Slider = ({
  setTrackIsActive,
  setIsDisabled,
  setMultiplier,
  setActiveItem,
  setConstraint,
  setItemWidth,
  isDisabled,
  itemLength,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap,
}) => {
  const [sliderRef, { width }] = useBoundingRect();
  const { breakpoints } = useTheme();

  const [isBetweenBaseAndSm] = useMediaQuery(
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.sm})`
  );
  const [isBetweenSmAndMd] = useMediaQuery(
    `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`
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

  const handleDotClick = (index) => {
    setTrackIsActive(true);
    setActiveItem(
      index > positions.length - constraint
        ? positions.length - constraint
        : index
    );
  };

  const handleSm = useCallback(() => {
    setItemWidth(Math.round(width) / 2);
    setIsDisabled(itemLength <= 2);
    setMultiplier(0.65);
    setConstraint(2);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    itemLength,
    width,
  ]);

  const handleMd = useCallback(() => {
    setItemWidth(Math.round(width) / 3);
    setIsDisabled(itemLength <= 3);
    setMultiplier(0.55);
    setConstraint(3);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    itemLength,
    width,
  ]);

  const handleLg = useCallback(() => {
    setItemWidth(Math.round(width) / 4);
    setIsDisabled(itemLength <= 4);
    setMultiplier(0.45);
    setConstraint(4);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    itemLength,
    width,
  ]);

  const handleXl = useCallback(() => {
    setItemWidth(
      itemLength <= 4 ? Math.round(width) / 5 : Math.round(width) / itemLength
    );
    setIsDisabled(true);
    setMultiplier(0.35);
    setConstraint(null);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    itemLength,
    width,
  ]);

  useEffect(() => {
    isBetweenBaseAndSm && handleSm();
    isBetweenSmAndMd && handleMd();
    isBetweenMdAndXl && handleLg();
    isGreaterThanXL && handleXl();
  }, [
    isBetweenBaseAndSm,
    isBetweenSmAndMd,
    isBetweenMdAndXl,
    isGreaterThanXL,
    handleSm,
    handleMd,
    handleLg,
    handleXl,
  ]);

  return (
    <Box p={gap}>
      <Box
        {...(!isDisabled && {
          _active: { cursor: "grabbing" },
          cursor: "grab",
        })}
        position="relative"
        overflow="hidden"
        ref={sliderRef}
        w="full"
        h="full"
      >
        {children}
      </Box>

      {!isDisabled && (
        <Flex w={`${itemWidth}px`} mt={gap * 2} mx="auto">
          <Button
            disabled={activeItem === positions.length - positions.length}
            onClick={handleDecrementClick}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            minW={0}
            mr={3}
          >
            <Icon name="chevron_left" boxSize={8} />
          </Button>

          <HStack
            spacing="14px"
            position="relative"
            _after={{
              content: "''",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%) translateX(0px)",
              left: 0,
              w: `${14 * 7}px`,
              h: "14px",
              rounded: 5,
              borderColor: "primary.300",
              borderWidth: 1,
            }}
          >
            {Array.from(Array(itemLength)).map((_, index) => (
              <Box
                onClick={() => handleDotClick(index)}
                as="button"
                h="14px"
                w="14px"
                rounded="full"
                bg={
                  index >= activeItem && index <= activeItem + constraint - 1
                    ? "green.500"
                    : "red.500"
                }
                key={index}
              />
            ))}
          </HStack>

          <Button
            disabled={activeItem === positions.length - constraint}
            onClick={handleIncrementClick}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            zIndex={2}
            minW={0}
            ml={3}
          >
            <Icon name="chevron_right" boxSize={8} />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Slider;
