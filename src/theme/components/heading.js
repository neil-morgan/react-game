import { fontRanges } from "../foundations"

const {
  xs,
  sm,
  md,
  lg,
  xl,
  "2xl": twoXL,
  "3xl": threeXL,
  "4xl": fourXL,
  "5xl": fiveXL,
  "6xl": sixXL,
} = fontRanges

export const Heading = {
  baseStyle: {
    lineHeight: "normal",
  },

  sizes: {
    xs: {
      fontSize: xs.fontSize,
    },
    sm: {
      fontSize: sm.fontSize,
    },
    md: {
      fontSize: md.fontSize,
    },
    lg: {
      fontSize: lg.fontSize,
    },
    xl: {
      fontSize: xl.fontSize,
    },
    "2xl": {
      fontSize: twoXL.fontSize,
    },
    "3xl": {
      fontSize: threeXL.fontSize,
    },
    "4xl": {
      fontSize: fourXL.fontSize,
    },
    "5xl": {
      fontSize: fiveXL.fontSize,
    },
    "6xl": {
      fontSize: sixXL.fontSize,
    },
  },

  defaultProps: {
    size: "4xl",
  },
}
