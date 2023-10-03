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
  groupSeriesInStack: {
    type: 'boolean',
    group: 'chart',
    default: true,
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
  showBarsSizeName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  customBarsSizeName: {
    type: 'text',
    group: 'labels',
    default: '',
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
