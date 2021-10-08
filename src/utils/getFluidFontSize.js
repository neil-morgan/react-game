import theme from "../theme";

const getFluidFontSize = (maxFontSize = 11, minFontSize = 8) => {
  const min = "xs";
  const max = "xxl";

  const getBreakpointSize = (bp) =>
    Number(theme.breakpoints[bp].replace(/\D/g, "") * 16);

  return {
    fontSize: {
      base: `${minFontSize}px`,
      [min]: `calc(${minFontSize}px + (${maxFontSize} - ${minFontSize}) * ((100vw - ${getBreakpointSize(
        min
      )}px) / (${getBreakpointSize(max)} - ${getBreakpointSize(min)})))`,
      [max]: `${maxFontSize}px`,
    },
  };
};

//font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width])))

export default getFluidFontSize;
