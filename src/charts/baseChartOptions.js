export const legend = (visualOptions) => {
  return {
    show: visualOptions.showLegend,
    width: visualOptions.legendWidth,
    orient: visualOptions.legendOrient,
    right: visualOptions.legendMarginRight,
    top: visualOptions.legendMarginTop,
    icon: 'rect',
  };
};

export const toolbox = (showToolbox) => {
  return {
    show: showToolbox,
    feature: {
      saveAsImage: {},
      dataView: {
        title: 'Vista de datos',
      },
      dataZoom: {},
      restore: {},
    },
  };
};

export const grid = (visualOptions) => {
  return {
    left: visualOptions.marginLeft,
    right: visualOptions.marginRight,
    bottom: visualOptions.marginBottom,
    top: visualOptions.marginTop,
    containLabel: true,
  };
};
