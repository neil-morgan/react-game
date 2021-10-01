import { useState, useMemo } from "react";

import Slider from "./Slider";
import Track from "./Track";
import Item from "./Item";

const Carousel = ({ children, gap = 4 }) => {
  const [trackIsActive, setTrackIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [multiplier, setMultiplier] = useState(0.35);
  const [activeItem, setActiveItem] = useState(0);
  const [constraint, setConstraint] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const itemLength = children.length;

  const positions = useMemo(
    () => children.map((_, index) => -Math.abs(itemWidth * index)),
    [children, itemWidth]
  );

  const sliderProps = {
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
  };

  const trackProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    isDisabled,
    activeItem,
    constraint,
    multiplier,
    itemWidth,
    positions,
  };

  const itemProps = {
    setTrackIsActive,
    trackIsActive,
    setActiveItem,
    activeItem,
    constraint,
    itemWidth,
    positions,
    gap,
  };

  return (
    <Slider {...sliderProps}>
      <Track {...trackProps}>
        {children.map((child, index) => (
          <Item {...itemProps} index={index} key={index}>
            {child}
          </Item>
        ))}
      </Track>
    </Slider>
  );
};

export default Carousel;
