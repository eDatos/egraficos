import { defaultColor } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  barsOrientation: {
    type: 'text',
    label: 'Bars orientation',
    group: 'chart',
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
    default: 'vertical',
  },
  sortBarsBy: {
    type: 'text',
    group: 'chart',
    options: [
      {
        label: 'name',
        value: 'name',
      },
      {
        label: 'original',
        value: 'original',
      },
    ],
    default: 'name',
  },
  // labels
  showAxisName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  axisNamePosition: {
    type: 'text',
    group: 'labels',
    disabled: {
      showAxisName: false,
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
  axisNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showAxisName: false,
    },
    default: 25,
  },
  showXaxisLabels: {
    type: 'boolean',
    label: 'Show axis Label',
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
      interpolator: 'defaultPalette',
      defaultColor: defaultColor,
    },
    group: 'colors',
  },
};
