import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { MotionBox } from "../../..";

const SelectableCard = ({ hidden, src, alt, onClick, selected, disable }) => {
  return (
    <MotionBox
      position="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
    >
      <Image
        w="200px"
        src={src}
        alt={alt}
        transition="ease 250ms"
        transform={`translateY(${selected ? "-20px" : "0px"})`}
        pointerEvents={disable ? "none" : "auto"}
        userSelect="none"
        hidden={hidden}
      />
      <Box
        onClick={() => onClick()}
        position="absolute"
        inset={0}
        bg={selected ? "transparent" : "rgba(0,0,0,0.5)"}
        transform={`translateY(${selected ? "-20px" : "0px"})`}
        cursor="pointer"
        transition="ease 250ms"
        pointerEvents={disable ? "none" : "auto"}
        _hover={{ bg: selected ? "transparent" : "rgba(0,0,0,0.25)" }}
      />
    </MotionBox>
  );
};

export default SelectableCard;
