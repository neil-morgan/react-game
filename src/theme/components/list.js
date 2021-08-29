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

export const List = {
  parts: ["item"],

  sizes: {
    xs: {
      item: {
        fontSize: xs.fontSize,
      },
    },
    sm: {
      item: {
        fontSize: sm.fontSize,
      },
    },
    md: {
      item: {
        fontSize: md.fontSize,
      },
    },
    lg: {
      item: {
        fontSize: lg.fontSize,
      },
    },
    xl: {
      item: {
        fontSize: xl.fontSize,
      },
    },
    "2xl": {
      item: {
        fontSize: twoXL.fontSize,
      },
    },
    "3xl": {
      item: {
        fontSize: threeXL.fontSize,
      },
    },
    "4xl": {
      item: {
        fontSize: fourXL.fontSize,
      },
    },
    "5xl": {
      item: {
        fontSize: fiveXL.fontSize,
      },
    },
    "6xl": {
      item: {
        fontSize: sixXL.fontSize,
      },
    },
  },
  defaultProps: {
    size: "md",
  },
}
