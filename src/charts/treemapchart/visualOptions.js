import { defaultColor } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  gapWidth: {
    type: 'number',
    default: 1,
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
