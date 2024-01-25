import { visualOptionsNumberFormat } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
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
    default: 'start',
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
  reverseOrder: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  showXaxisName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  customXaxisName: {
    type: 'text',
    default: '',
    group: 'labels',
    disabled: {
      showXaxisName: false,
    },
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
    default: 20,
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
  xAxisFormat: {
    type: 'text',
    group: 'labels',
    default: 'original',
    options: [
      {
        label: 'original',
        value: 'original',
      },
    ],
    disabled: {
      showXaxisLabels: false,
    },
  },
  showYaxisName: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  customYaxisName: {
    type: 'text',
    default: '',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
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
    default: 'middle',
  },
  yAxisNameGap: {
    type: 'number',
    group: 'labels',
    disabled: {
      showYaxisName: false,
    },
    default: 35,
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
  yAxisFormat: {
    type: 'text',
    group: 'labels',
    default: 'standard',
    options: visualOptionsNumberFormat.options,
    disabled: {
      showYaxisLabels: false,
    },
  },
  tooltipValueFormat: {
    type: 'text',
    group: 'labels',
    default: 'standard',
    options: visualOptionsNumberFormat.options,
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
      defaultColor: '#009BD7',
    },
    group: 'colors',
  },
};
