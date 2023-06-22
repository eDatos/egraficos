import { defaultColor } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  symbolSize: {
    type: 'number',
    default: 10,
    group: 'chart',
  },
  xAxisOriginTo0: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },
  yAxisOriginTo0: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },
  showXaxisName: {
    type: 'boolean',
    default: true,
    group: 'labels',
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
    default: 25,
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
  showYaxisName: {
    type: 'boolean',
    default: true,
    group: 'labels',
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
