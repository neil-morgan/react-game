import { Flex, Image } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { MotionBox } from "..";

const LiveCard = ({ src, alt, onClick }) => {
  return (
    <MotionBox
      position="absolute"
      inset={0}
      h="full"
      as={Image}
      onClick={onClick}
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 2,
        },
      }}
    />
  );
};

const DeadCard = () => {
  return (
    <MotionBox
      position="absolute"
      pb="50%"
      w="50%"
      h={0}
      bg="red.d200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 1,
        },
      }}
    />
  );
};

const PlayerCard = (props) => {
  console.log(props);
  return (
    <>
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
        <AnimatePresence exitBeforeEnter>
          {props.toggle ? (
            <DeadCard key={props.toggle} />
          ) : (
            <LiveCard key={props.toggle} {...props} />
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default PlayerCard;
