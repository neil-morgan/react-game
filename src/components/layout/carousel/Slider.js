import { useEffect, useCallback } from "react";
import { useBreakpointValue, Flex, Box } from "@chakra-ui/react";
import { useBoundingRect } from "../../../hooks";
import Navigator from "./Navigator";

const Slider = ({
  setTrackIsActive,
  setIsDisabled,
  setMultiplier,
  setActiveItem,
  setConstraint,
  setItemWidth,
  isDisabled,
  activeItem,
  constraint,
  itemWidth,
  positions,
  children,
  gap,
}) => {
  const [sliderRef, { width }] = useBoundingRect(0);

  const bp = useBreakpointValue({
    base: "base",
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

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

  const handleBase = useCallback(() => {
    setItemWidth(Math.round(width) / 2);
    setIsDisabled(positions.length <= 2);
    setMultiplier(0.65);
    setConstraint(2);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    positions,
    width,
  ]);

  const handleSm = useCallback(() => {
    setItemWidth(Math.round(width) / 3);
    setIsDisabled(positions.length <= 3);
    setMultiplier(0.55);
    setConstraint(3);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    positions,
    width,
  ]);

  const handleMd = useCallback(() => {
    setItemWidth(Math.round(width) / 4);
    setIsDisabled(positions.length <= 4);
    setMultiplier(0.45);
    setConstraint(4);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    positions,
    width,
  ]);

  const handleLg = useCallback(() => {
    setItemWidth(Math.round(width) / 5);
    setIsDisabled(positions.length <= 5);
    setMultiplier(0.45);
    setConstraint(5);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    positions,
    width,
  ]);

  const handleXl = useCallback(() => {
    setItemWidth(Math.round(width) / positions.length);
    setIsDisabled(true);
    setMultiplier(0.35);
    setConstraint(null);
    setActiveItem(0);
  }, [
    setIsDisabled,
    setConstraint,
    setMultiplier,
    setItemWidth,
    setActiveItem,
    positions,
    width,
  ]);

  useEffect(() => {
    const mapBp = {
      base: () => handleBase(),
      xs: () => handleSm(),
      sm: () => handleSm(),
      md: () => handleMd(),
      lg: () => handleLg(),
      xl: () => handleXl(),
    };

    bp && mapBp[bp]();
  }, [bp, handleBase, handleSm, handleMd, handleLg, handleXl]);

  const navigatorProps = {
    handleDecrementClick,
    handleIncrementClick,
    handleDotClick,
    handleFocus,
    activeItem,
    constraint,
    isDisabled,
    positions,
    itemWidth,
    gap,
  };

  return (
    <Flex direction="column" px={gap} maxW="1920px">
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
      <Navigator {...navigatorProps} />
    </Flex>
  );
};

export default Slider;
