export const visualOptions = {
  marginTop: {
    type: 'number',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    default: 15,
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
  showPoints: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },

  dotsDiameter: {
    type: 'number',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
  },
  stepCurve: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  stepType: {
    type: 'text',
    default: 'Middle',
    options: [
      { label: 'start', value: 'start' },
      { label: 'middle', value: 'middle' },
      { label: 'end', value: 'end' },
    ],
    group: 'chart',
    disabled: {
      stepCurve: false,
    },
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
