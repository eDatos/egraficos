export const visualOptions = {
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 50,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 20,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 20,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 50,
    group: 'artboard',
  },

  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 500,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendOrient: {
    type: 'text',
    label: 'Legend orient',
    group: 'artboard',
    options: [
      {
        label: 'Vertical',
        value: 'vertical',
      },
      {
        label: 'Horizontal',
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
    label: 'Legend Margin(Right)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginTop: {
    type: 'number',
    label: 'Legend Margin(Top)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  showToolbox: {
    type: 'boolean',
    label: 'Show Toolbox',
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
    label: 'Dots diameter',
    default: 10,
    group: 'chart',
  },
  xAxisOriginTo0: {
    type: 'boolean',
    label: 'Set X origin to 0',
    default: false,
    group: 'chart',
  },
  yAxisOriginTo0: {
    type: 'boolean',
    label: 'Set y origin to 0',
    default: false,
    group: 'chart',
  },
  showXaxisName: {
    type: 'boolean',
    label: 'Show X axis Name',
    default: true,
    group: 'labels',
  },
  xAxisNamePosition: {
    type: 'text',
    label: 'X axis Name Postion',
    group: 'labels',
    disabled: {
      showXaxisName: false,
    },
    options: [
      {
        label: 'Start',
        value: 'start',
      },
      {
        label: 'Middle',
        value: 'middle',
      },
      {
        label: 'End',
        value: 'end',
      },
    ],
    default: 'middle',
  },
  xAxisNameGap: {
    type: 'number',
    label: 'X axis Name Gap',
    group: 'labels',
    disabled: {
      showXaxisName: false,
    },
    default: 25,
  },
  showXaxisLabels: {
    type: 'boolean',
    label: 'Show X axis Label',
    default: true,
    group: 'labels',
  },
  showXaxisLabelsRotate: {
    type: 'number',
    label: 'Label X rotation',
    group: 'labels',
    disabled: {
      showXaxisLabels: false,
    },
    default: 0,
  },
  showXaxisLabelsFontSize: {
    type: 'number',
    label: 'Label X size',
    group: 'labels',
    disabled: {
      showXaxisLabels: false,
    },
    default: 12,
  },
  showYaxisName: {
    type: 'boolean',
    label: 'Show Y axis Name',
    default: true,
    group: 'labels',
  },
  yAxisNamePosition: {
    type: 'text',
    label: 'Y axis Name Position',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
    options: [
      {
        label: 'Start',
        value: 'start',
      },
      {
        label: 'Middle',
        value: 'middle',
      },
      {
        label: 'End',
        value: 'end',
      },
    ],
    default: 'end',
  },
  yAxisNameGap: {
    type: 'number',
    label: 'Y axis Name Gap',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
    default: 15,
  },
  showYaxisLabels: {
    type: 'boolean',
    label: 'Show Y axis Label',
    default: true,
    group: 'labels',
  },
  showYaxisLabelsRotate: {
    type: 'number',
    label: 'Label Y rotation',
    group: 'labels',
    disabled: {
      showYaxisLabels: false,
    },
    default: 0,
  },
  showYaxisLabelsFontSize: {
    type: 'number',
    label: 'Label Y size',
    group: 'labels',
    disabled: {
      showYaxisLabels: false,
    },
    default: 12,
  },
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
      defaultColor: '#385ad4',
    },
    group: 'colors',
  },
}
