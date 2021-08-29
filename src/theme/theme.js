import { extendTheme } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"

import { styles, layerStyles, textStyles } from "./styles"

import {
  Container,
  Heading,
  Text,
  Button,
  Link,
  Divider,
  Section,
  List,
} from "./components"

import {
  breakpoints,
  colors,
  fontWeights,
  fontRanges,
  fontSizes,
  fonts,
} from "./foundations"

const overrides = {
  config: { initialColorMode: "dark", useSystemColorMode: false },

  components: {
    Container,
    Heading,
    Divider,
    Section,
    Button,
    Link,
    List,
    Text,
  },

  layerStyles,
  textStyles,
  styles,

  breakpoints,
  colors,
  fontWeights,
  fontRanges,
  fontSizes,
  fonts,
}

export const theme = extendTheme(overrides)
