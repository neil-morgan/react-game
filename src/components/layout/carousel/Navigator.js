import { HStack, Button, Flex, Box } from "@chakra-ui/react";
import { Icon } from "../../";

const Navigator = ({
  handleDecrementClick,
  handleIncrementClick,
  handleDotClick,
  handleFocus,
  activeItem,
  constraint,
  isDisabled,
  positions,
  gap,
}) =>
  !isDisabled && (
    <Flex w="full" justify="center" mt="30px">
      <Button
        disabled={activeItem === positions.length - positions.length}
        onClick={handleDecrementClick}
        onFocus={handleFocus}
        transition="400ms ease"
        color="gray.200"
        variant="link"
        minW={0}
        mr={4}
      >
        <Icon name="chevron_left" boxSize={8} />
      </Button>

      <HStack
        position="relative"
        spacing="14px"
        _after={{
          transform: `translateY(-50%) translateX(${activeItem * 28}px)`,
          w: `${14 * (constraint + constraint - 1) + 14}px`,
          transition: "ease 500ms",
          borderColor: "base.500",
          pointerEvents: "none",
          position: "absolute",
          borderWidth: 1,
          content: "''",
          left: "-7px",
          top: "50%",
          rounded: 4,
          h: "28px",
        }}
      >
        {Array.from(Array(positions.length)).map((_, index) => (
          <Flex
            onClick={() => handleDotClick(index)}
            justify="space-between"
            key={index}
            as="button"
            h="14px"
            w="14px"
          >
            <Box w="6px" h="full" bg="primary.300" rounded={1} />
            <Box w="6px" h="full" bg="primary.300" rounded={1} />
          </Flex>
        ))}
      </HStack>

      <Button
        disabled={activeItem === positions.length - constraint}
        onClick={handleIncrementClick}
        onFocus={handleFocus}
        transition="400ms ease"
        color="gray.200"
        variant="link"
        zIndex={2}
        minW={0}
        ml={4}
      >
        <Icon name="chevron_right" boxSize={8} />
      </Button>
    </Flex>
  );

export default Navigator;
