import { Flex, Image } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "..";

const LiveCard = ({ src, alt, onClick }) => {
  const animation = {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <MotionBox
      position="absolute"
      inset={0}
      h="full"
      as={Image}
      onClick={onClick}
      src={src}
      alt={alt}
      {...animation}
    />
  );
};

const DeadCard = () => {
  const animation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  return (
    <MotionBox
      position="absolute"
      pb="50%"
      w="50%"
      h={0}
      bg="red.d200"
      {...animation}
    />
  );
};

const PlayerCard = (props) => (
  <Flex
    position="relative"
    h="155px"
    w="100px"
    rounded={6}
    bg="base.d700"
    _first={{ mr: 3 }}
    justify="center"
    alignItems="center"
  >
    <AnimatePresence>
      {props.toggle ? (
        <DeadCard key={"dead-card" + props.id} />
      ) : (
        <LiveCard key={"live-card" + props.id} {...props} />
      )}
    </AnimatePresence>
  </Flex>
);

export default PlayerCard;
