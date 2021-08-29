export const styles = {
  global: {
    "*, *::before, *::after": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },

    ".js-focus-visible :focus:not([data-focus-visible-added])": {
      outline: "none",
      boxShadow: "none",
    },

    body: {
      overflowX: "hidden",
      overflowY: "scroll",
      fontFamily: "Inter, sans-serif",
      color: "gray.400",
      bg: "base.d200",
    },
  },
}

export const textStyles = {
  heading: {
    letterSpacing: "wide",
    fontWeight: "semibold",
    color: "gray.200",
  },

  mono: {
    fontFamily: "Roboto Mono",
  },

  textHover: {
    transition: "200ms ease",
    _hover: {
      color: "primary.200",
    },
  },
}

export const layerStyles = {
  layerHover: {
    position: "relative",
    _hover: {
      _after: {
        bg: "rgba(255,255,255,0.2)",
      },
    },
    _after: {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      h: "full",
      w: "full",
      bg: "transparent",
      transition: "200ms ease",
    },
  },
}
