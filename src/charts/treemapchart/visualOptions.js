import { defaultColor, white } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  gapColor: {
    type: 'color',
    default: white,
    group: 'chart',
  },
  gapWidth: {
    type: 'number',
    default: 1,
    group: 'chart',
  },
  borderColor: {
    type: 'color',
    default: white,
    group: 'chart',
  },
  borderWidth: {
    type: 'number',
    default: 5,
    group: 'chart',
  },
  showLegend: {
    type: 'boolean',
    default: false,
    group: 'artboard',
    show: false,
  },
  legendWidth: {
    type: 'boolean',
    group: 'artboard',
    show: false,
  },
  legendOrient: {
    type: 'boolean',
    group: 'artboard',
    show: false,
  },
  legendMarginRight: {
    type: 'boolean',
    group: 'artboard',
    show: false,
  },
  legendMarginTop: {
    type: 'boolean',
    group: 'artboard',
    show: false,
  },
  showLabel: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  showUpperLabel: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  dateFormat: {
    type: 'text',
    group: 'labels',
    default: 'original',
    options: [
      {
        label: 'original',
        value: 'original',
      },
      {
        label: 'year',
        value: 'year',
      },
      {
        label: 'month',
        value: 'month',
      },
      {
        label: 'dayOfWeek',
        value: 'dayOfWeek',
      },
    ],
  },
  tooltipValueFormat: {
    type: 'text',
    group: 'labels',
    default: 'standard',
    options: [
      {
        label: 'standard',
        value: 'standard',
      },
      {
        label: 'scientific',
        value: 'scientific',
      },
      {
        label: 'engineering',
        value: 'engineering',
      },
      {
        label: 'compact',
        value: 'compact',
      },
    ],
  },
  units: {
    type: 'text',
    default: '',
    group: 'labels',
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
