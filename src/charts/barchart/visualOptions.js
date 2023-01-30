export const visualOptions = {
    marginTop: {
      type: 'number',
      label: 'Margin (top)',
      default: 20,
      group: 'artboard'
    },
    marginRight: {
      type: 'number',
      label: 'Margin (right)',
      default: 10,
      group: 'artboard'
    },
    marginBottom: {
      type: 'number',
      label: 'Margin (bottom)',
      default: 20,
      group: 'artboard'
    },
    marginLeft: {
      type: 'number',
      label: 'Margin (left)',
      default: 50,
      group: 'artboard'
    },
    showLegend: {
      type: 'boolean',
      label: 'Show legend',
      default: false,
      group: 'artboard'
    },
    legendWidth: {
      type: 'number',
      label: 'Legend width',
      default: 500,
      group: 'artboard',
      disabled: {
        showLegend: false
      }
    },
    legendOrient: {
      type: 'text',
      label: 'Legend orient',
      group: 'artboard',
      options: [{
        label: 'Vertical',
        value: 'vertical'
      }, {
        label: 'Horizontal',
        value: 'horizontal'
      }],
      default: 'horizontal',
      disabled: {
        showLegend: false
      }
    },
    legendMarginRight: {
      type: 'number',
      label: 'Legend Margin(Right)',
      default: 'auto',
      group: 'artboard',
      disabled: {
        showLegend: false
      }
    },
    legendMarginTop: {
      type: 'number',
      label: 'Legend Margin(Top)',
      default: 'auto',
      group: 'artboard',
      disabled: {
        showLegend: false
      }
    },
    showToolbox: {
      type: 'boolean',
      label: 'Show Toolbox',
      default: false,
      group: 'artboard'
    },
    padding: {
      type: 'number',
      label: 'Padding',
      default: 1,
      group: 'chart',
      disabled: true//TODO VER SI SE METE ESTA PROPIEDAD
    },
    barsOrientation: {
      type: 'text',
      label: 'Bars orientation',
      group: 'chart',
      options: [{
        label: 'Vertically',
        value: 'vertical'
      }, {
        label: 'Horizontally',
        value: 'horizontal'
      }],
      default: 'vertical',
      disabled: true//TODO VER SI SE METE ESTA PROPIEDAD

    },
    sortBarsBy: {
      type: 'text',
      label: 'Sort bars by',
      group: 'chart',
      options: [{
        label: 'Size (descending)',
        value: 'totalDescending'
      }, {
        label: 'Size (ascending)',
        value: 'totalAscending'
      }, {
        label: 'Name',
        value: 'name'
      }, {
        label: 'Original',
        value: 'original'
      }],
      default: 'name',
      disabled: true//TODO VER SI SE METE ESTA PROPIEDAD.SI SE AÑADIRA SEGURO

    },
    // useSameScale: {
    //   type: 'boolean',
    //   label: 'Use same scale',
    //   default: true,
    //   group: 'series'
    // },
    // columnsNumber: {
    //   type: 'number',
    //   label: 'Number of columns',
    //   default: 0,
    //   group: 'series'
    // },
    // sortSeriesBy: {
    //   type: 'text',
    //   label: 'Sort series by',
    //   group: 'series',
    //   options: ['Total value (descending)', 'Total value (ascending)', 'Name', 'Original'],
    //   default: 'Total value (descending)'
    // },
    // showSeriesLabels: {
    //   type: 'boolean',
    //   label: 'Show series titles',
    //   default: true,
    //   group: 'series'
    // },
    // repeatAxesLabels: {
    //   type: 'boolean',
    //   label: 'Repeat axis labels for each series',
    //   default: false,
    //   group: 'series'
    // },
    // showGrid: {
    //   type: 'boolean',
    //   label: 'Show series grid',
    //   default: false,
    //   group: 'series'
    // },
    colorScale: {
      type: 'colorScale',
      label: 'Color scale',
      dimension: 'color',
      default: {
        scaleType: 'ordinal',
        interpolator: 'interpolateBlues',
        defaultColor: '#385ad4'
      },
      group: 'colors'
    },
  // labels
  showXaxisLabels: {
    type: 'boolean',
    label: 'Show axis Label',
    default: true,
    group: 'labels'
  },
  showXaxisLabelsRotate: {
    type: 'number',
    label: 'Label rotation',
    group: 'labels',
    disabled: {
      showXaxisLabels: false
    },
    default: 0,
  },
  showXaxisLabelsFontSize: {
    type: 'number',
    label: 'Label size',
    group: 'labels',
    disabled: {
      showXaxisLabels: false
    },
    default: 12,
  },
  };