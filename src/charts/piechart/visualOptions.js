export const visualOptions = {
  // Artboard
  marginTop: {
    type: 'number',
    default: 10,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    default: 2,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: 2,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    default: 2,
    group: 'artboard',
  },
  showLegend: {
    type: 'boolean',
    default: false,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    default: 500,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendOrient: {
    type: 'text',
    default: 'horizontal',
    group: 'artboard',
    options: [
      {
        label: 'vertical',
        value: 'vertical',
      },
      {
        label: 'horizontal',
        value: 'horizontal',
      },
    ],
    disabled: {
      showLegend: false,
    },
  },
  legendMarginRight: {
    type: 'number',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginTop: {
    type: 'number',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  showToolbox: {
    type: 'boolean',
    default: false,
    group: 'artboard',
  },
  render: {
    type: 'text',
    group: 'artboard',
    options: [
      {
        label: 'Svg',
        value: 'svg',
      },
      {
        label: 'Canvas',
        value: 'canvas',
      },
    ],
    default: 'svg',
  },
  // chart
  drawDonut: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  arcTichkness: {
    type: 'number',
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false,
    },
  },
  nightingaleChart: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  nightingaleChartOption: {
    type: 'text',
    group: 'chart',
    disabled: {
      nightingaleChartOption: false,
    },
    options: [
      {
        label: 'Radius',
        value: 'radius',
      },
      {
        label: 'Area',
        value: 'area',
      },
    ],
    default: 'area',
  },
  // colors
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  // labels
  showSeriesLabels: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  showSeriesLabelsPosition: {
    type: 'text',
    group: 'labels',
    disabled: {
      showSeriesLabels: false,
    },
    options: [
      {
        label: 'outside',
        value: 'outside',
      },
      {
        label: 'inside',
        value: 'inside',
      },
      {
        label: 'center',
        value: 'center',
      },
    ],
    default: 'inner',
  },
}
