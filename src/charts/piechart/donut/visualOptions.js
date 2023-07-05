import { defaultColor } from '../../../constants';
import { baseVisualOptions } from '../../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  marginTop: {
    type: 'number',
    default: -50,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    default: -5,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: -40,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    default: -5,
    group: 'artboard',
  },
  // chart
  borderWidth: {
    type: 'number',
    default: 2,
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
  // labels
  units: {
    type: 'text',
    default: '',
    group: 'labels',
  },
  showValueAndPercentage: {
    type: 'text',
    group: 'labels',
    options: [
      {
        label: 'value',
        value: 'value',
      },
      {
        label: 'percentage',
        value: 'percentage',
      },
      {
        label: 'both',
        value: 'both',
      },
    ],
    default: 'value',
  },
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
    ],
    default: 'outside',
  },
  showValueOnSeriesLabels: {
    type: 'boolean',
    group: 'labels',
    disabled: {
      showSeriesLabels: false,
    },
    default: false,
  },
  colorScale: {
    type: 'colorScale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'defaultPalette',
      defaultColor: defaultColor,
    },
    group: 'colors',
  },
};
