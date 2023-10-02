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
        label: 'totalDescending',
        value: 'totalDescending',
      },
      {
        label: 'totalAscending',
        value: 'totalAscending',
      },
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
  showBarsName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  customBarsName: {
    type: 'text',
    default: '',
    group: 'labels',
    disabled: {
      showBarsName: false,
    },
  },
  barsNameLocation: {
    type: 'text',
    group: 'labels',
    disabled: {
      showBarsName: false,
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
  barsNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsName: false,
    },
    default: 25,
  },
  showBarsLabels: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  barsLabelsRotate: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsLabels: false,
    },
    default: 0,
  },
  barsLabelsFontSize: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsLabels: false,
    },
    default: 12,
  },
  barsLabelsFormat: {
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
    disabled: {
      showBarsLabels: false,
    },
  },
  showBarsSizeName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  customBarsSizeName: {
    type: 'text',
    default: '',
    group: 'labels',
    disabled: {
      showBarsSizeName: false,
    },
  },
  barsSizeNameLocation: {
    type: 'text',
    group: 'labels',
    disabled: {
      showBarsSizeName: false,
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
  barsSizeNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsSizeName: false,
    },
    default: 35,
  },
  units: {
    type: 'text',
    default: '',
    group: 'labels',
  },
  showBarsSizeLabels: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  barsSizeLabelsRotate: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsSizeName: false,
    },
    default: 0,
  },
  barsSizeLabelsFontSize: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsSizeName: false,
    },
    default: 12,
  },
  barsSizeLabelsFormat: {
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
    disabled: {
      showBarsSizeLabels: false,
    },
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
