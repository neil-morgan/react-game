import { useState, useEffect, useCallback } from "react";
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

  const handleSm = useCallback(() => {
    setItemWidth(Math.round(width) / 3);
    setMultiplier(0.65);
    setConstraint(1);
  }, [
    // setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    // itemLength,
    width,
  ]);

  const handleMd = useCallback(() => {
    setItemWidth(Math.round(width) / 3);
    setMultiplier(0.65);
    setConstraint(1);
  }, [
    // setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    // itemLength,
    width,
  ]);

  const handleLg = useCallback(() => {
    setItemWidth(Math.round(width) / 4);
    setIsDisabled(itemLength <= 4);
    setMultiplier(0.5);
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
    setItemWidth(Math.round(width) / itemLength);
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
        <Flex w={`${itemWidth}px`} mt={gap * 4} mx="auto">
          <Button
            disabled={activeItem === positions.length - positions.length}
            onClick={handleDecrementClick}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            minW={0}
          >
            <Icon name="chevron_left" boxSize={7} />
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
            disabled={activeItem === positions.length - constraint}
            onClick={handleIncrementClick}
            onFocus={handleFocus}
            color="gray.200"
            variant="link"
            zIndex={2}
            minW={0}
          >
            <Icon name="chevron_right" boxSize={7} />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Slider;
