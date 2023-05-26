import { baseVisualOptions } from '../baseVisualOptions'

export const visualOptions = {
  ...baseVisualOptions,
  marginLeft: {
    type: 'number',
    default: 15,
    group: 'artboard',
  },
  // chart
  drawDonut: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },
  arcTichkness: {
    type: 'number',
    default: 25,
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
  showpercentage: {
    type: 'boolean',
    default: false,
    group: 'chart',
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
    default: 'inside',
  },
}
