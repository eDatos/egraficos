export const visualOptions = {
  // Artboard
  marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 2,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 2,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 2,
    group: 'artboard',
  },
  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },
  legendWidth: {
    type: 'number',
    label: 'Legend width',
    default: 500,
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendOrient: {
    type: 'text',
    label: 'Legend orient',
    default: 'horizontal',
    group: 'artboard',
    options: [
      {
        label: 'Vertical',
        value: 'vertical',
      },
      {
        label: 'Horizontal',
        value: 'horizontal',
      },
    ],
    disabled: {
      showLegend: false,
    },
  },
  legendMarginRight: {
    type: 'number',
    label: 'Legend Margin(Right)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginTop: {
    type: 'number',
    label: 'Legend Margin(Top)',
    default: 'auto',
    group: 'artboard',
    disabled: {
      showLegend: false,
    },
  },
  showToolbox: {
    type: 'boolean',
    label: 'Show Toolbox',
    default: false,
    group: 'artboard',
  },
  render: {
    type: 'text',
    label: 'Render',
    group: 'artboard',
    options: [
      {
        label: 'Svg',
        value: 'svg',
      },
      {
        label: 'Canvas',
        value: 'canvas',
      },
    ],
    default: 'svg',
  },
  // chart
  drawDonut: {
    type: 'boolean',
    label: 'Draw as donuts',
    default: false,
    group: 'chart',
  },
  arcTichkness: {
    type: 'number',
    label: 'Donut thickness',
    default: 10,
    group: 'chart',
    disabled: {
      drawDonut: false,
    },
  },
  nightingaleChart: {
    type: 'boolean',
    label: 'Draw as Nightingale Chart',
    default: false,
    group: 'chart',
  },
  nightingaleChartOption: {
    type: 'text',
    label: 'Nightingale',
    group: 'chart',
    disabled: {
      nightingaleChartOption: false,
    },
    options: [
      {
        label: 'Radius',
        value: 'radius',
      },
      {
        label: 'Area',
        value: 'area',
      },
    ],
    default: 'area',
  },
  sortArcsBy: {
    type: 'text',
    label: 'Sort arcs by',
    group: 'series',
    options: [
      {
        label: 'Size (descending)',
        value: 'totalDescending',
      },
      {
        label: 'Size (ascending)',
        value: 'totalAscending',
      },
      {
        label: 'Name',
        value: 'name',
      },
      {
        label: 'Original',
        value: 'original',
      },
    ],
    default: 'name',
  },
  // colors
  colorScale: {
    type: 'colorScale',
    label: 'Color scale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'interpolateSpectral',
    },
    group: 'colors',
  },
  // labels
  showSeriesLabels: {
    type: 'boolean',
    label: 'Show pies titles',
    default: true,
    group: 'labels',
  },
  showSeriesLabelsPosition: {
    type: 'text',
    label: 'Label position',
    group: 'labels',
    disabled: {
      showSeriesLabels: false,
    },
    options: [
      {
        label: 'Outside',
        value: 'outside',
      },
      {
        label: 'Inside',
        value: 'inside',
      },
      {
        label: 'Inner',
        value: 'inner',
      },
      {
        label: 'Center',
        value: 'center',
      },
    ],
    default: 'inner',
  },
  // series
  // sortPiesBy: {
  //   type: 'text',
  //   label: 'Sort pies by',
  //   group: 'series',
  //   options: [{
  //     label: 'Size (descending)',
  //     value: 'totalDescending'
  //   }, {
  //     label: 'Size (ascending)',
  //     value: 'totalAscending'
  //   }, {
  //     label: 'Name',
  //     value: 'name'
  //   }, {
  //     label: 'Original',
  //     value: 'original'
  //   }],
  //   default: 'name'
  // },
  rowsNumber: {
    type: 'number',
    label: 'Grid rows',
    default: 1,
    group: 'series',
  },
}
