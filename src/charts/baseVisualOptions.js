import { white } from '../constants';

export const baseVisualOptions = {
  title: {
    type: 'text',
    group: 'artboard',
  },
  width: {
    type: 'number',
    default: 1000,
    container: 'width',
    group: 'artboard',
  },
  marginTop: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    default: 15,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: 50,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    default: 30,
    group: 'artboard',
  },
  showLegend: {
    type: 'boolean',
    default: true,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    default: 900,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendOrient: {
    type: 'text',
    group: 'artboard',
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
    default: 'horizontal',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginRight: {
    type: 'number',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginTop: {
    type: 'number',
    default: 570,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  showToolbox: {
    type: 'boolean',
    default: true,
    group: 'artboard',
  },
  render: {
    type: 'text',
    group: 'artboard',
    options: [
      {
        label: 'svg',
        value: 'svg',
      },
      {
        label: 'canvas',
        value: 'canvas',
      },
    ],
    default: 'svg',
  },
  background: {
    type: 'color',
    default: white,
    group: 'colors',
  },
};
