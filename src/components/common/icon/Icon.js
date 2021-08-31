import { forwardRef } from "react";
import { Icon as ChakraIcon } from "@chakra-ui/react";
import paths from "./paths";

const Icon = forwardRef(({ name, ...rest }, ref) => (
  <ChakraIcon ref={ref} {...rest}>
    <use
      href={`#${paths.find((path) => path.name === name.trim()).name}-icon`}
    />
  </ChakraIcon>
));

Icon.displayName = "Icon";

export default Icon;
