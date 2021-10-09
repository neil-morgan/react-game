import { useTheme } from "@chakra-ui/react";
import { transparentize } from "@chakra-ui/theme-tools";

const useTransparentizedColor = (color, opacity = 0.5) =>
  transparentize(color, opacity)(useTheme());

export default useTransparentizedColor;
