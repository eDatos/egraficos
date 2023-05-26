import { baseVisualOptions } from '../baseVisualOptions'

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
  colorScale: {
    type: 'colorScale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
      defaultColor: '#009BD7',
    },
    group: 'colors',
  },
  // labels
  showXaxisName: {
    type: 'boolean',
    default: false,
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
  showYaxisName: {
    type: 'boolean',
    default: false,
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
}
