export const visualOptions = {
  marginTop: {
    type: 'number',
    default: 50,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    default: 20,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    default: 20,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    default: 50,
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
    default: 'horizontal',
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
    label: 'Render',
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
  symbolSize: {
    type: 'number',
    default: 10,
    group: 'chart',
  },
  xAxisOriginTo0: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  yAxisOriginTo0: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  showXaxisName: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  xAxisNamePosition: {
    type: 'text',
    group: 'labels',
    disabled: {
      showXaxisName: false,
    },
    options: [
      {
        label: 'start',
        value: 'start',
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'end',
        value: 'end',
      },
    ],
    default: 'middle',
  },
  xAxisNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showXaxisName: false,
    },
    default: 25,
  },
  showXaxisLabels: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  showXaxisLabelsRotate: {
    type: 'number',
    group: 'labels',
    disabled: {
      showXaxisLabels: false,
    },
    default: 0,
  },
  showXaxisLabelsFontSize: {
    type: 'number',
    group: 'labels',
    disabled: {
      showXaxisLabels: false,
    },
    default: 12,
  },
  showYaxisName: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  yAxisNamePosition: {
    type: 'text',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
    options: [
      {
        label: 'start',
        value: 'start',
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'end',
        value: 'end',
      },
    ],
    default: 'end',
  },
  yAxisNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
    default: 15,
  },
  showYaxisLabels: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  showYaxisLabelsRotate: {
    type: 'number',
    group: 'labels',
    disabled: {
      showYaxisLabels: false,
    },
    default: 0,
  },
  showYaxisLabelsFontSize: {
    type: 'number',
    group: 'labels',
    disabled: {
      showYaxisLabels: false,
    },
    default: 12,
  },
  colorScale: {
    type: 'colorScale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
      defaultColor: '#385ad4',
    },
    group: 'colors',
  },
}
