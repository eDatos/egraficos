export const visualOptions = {
    marginTop: {
      type: 'number',
      label: 'Margin (top)',
      default: 10,
      group: 'artboard',
    },
  
    marginRight: {
      type: 'number',
      label: 'Margin (right)',
      default: 15,
      group: 'artboard',
    },
  
    marginBottom: {
      type: 'number',
      label: 'Margin (bottom)',
      default: 20,
      group: 'artboard',
    },
  
    marginLeft: {
      type: 'number',
      label: 'Margin (left)',
      default: 50,
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
  
    showPoints: {
      type: 'boolean',
      label: 'Show dots on data values',
      default: false,
      group: 'chart',
    },
  
    dotsDiameter: {
      type: 'number',
      label: 'Dots diameter',
      default: 2,
      group: 'chart',
      disabled: {
        showPoints: false
      }
    },
    stepCurve: {
      type: 'boolean',
      label: 'Step curve',
      default: false,
      group: 'chart',
    },
    stepType: {
      type: 'text',
      label: 'Step type',
      default: 'Middle',
      options: [
             { label: 'Start', value: 'start' },
             { label: 'Middle', value: 'middle' },
             { label: 'End', value: 'end' }],
      group: 'chart',
      disabled: {
        stepCurve: false
      }
    },
    // interpolation: {
    //   type: 'text',
    //   label: 'Curve type',
    //   default: 'curveBumpX',
    //   options: [
    //     { label: 'Basis', value: 'curveBasis' },
    //     { label: 'Bundle', value: 'curveBundle' },
    //     { label: 'Bump', value: 'curveBumpX' },
    //     { label: 'Cardinal', value: 'curveCardinal' },
    //     { label: 'Catmull–Rom', value: 'curveCatmullRom' },
    //     { label: 'Linear', value: 'curveLinear' },
    //     { label: 'Monotone X', value: 'curveMonotoneX' },
    //     { label: 'Natural', value: 'curveNatural' },
    //     { label: 'Step', value: 'curveStep' },
    //     { label: 'Step After', value: 'curveStepAfter' },
    //     { label: 'Step Before', value: 'curveStepBefore' },
    //   ],
    //   group: 'chart',
    // },
  
    // yOrigin: {
    //   type: 'boolean',
    //   label: 'Set Y origin to 0',
    //   default: false,
    //   group: 'chart',
    //   requiredDimensions: ['y'],
    // },
  
    // columnsNumber: {
    //   type: 'number',
    //   label: 'Number of columns',
    //   default: 0,
    //   group: 'series',
    // },
  
    // sortSeriesBy: {
    //   type: 'text',
    //   label: 'Sort series by',
    //   group: 'series',
    //   options: [
    //     'Total value (descending)',
    //     'Total value (ascending)',
    //     'Name',
    //     'Original',
    //   ],
    //   default: 'Total value (descending)',
    // },
  
    // useSameScale: {
    //   type: 'boolean',
    //   label: 'Use same scale',
    //   default: true,
    //   group: 'series',
    // },
  
    // showSeriesLabels: {
    //   type: 'boolean',
    //   label: 'Show series titles',
    //   default: true,
    //   group: 'series',
    // },
  
    // repeatAxesLabels: {
    //   type: 'boolean',
    //   label: 'Repeat axis labels for each series',
    //   default: false,
    //   group: 'series',
    // },
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
    // showLabels: {
    //   type: 'boolean',
    //   label: 'Show labels',
    //   default: true,
    //   group: 'labels',
    // },
  
    // labelsPosition: {
    //   type: 'text',
    //   label: 'Labels position',
    //   options: ['inline', 'side'],
    //   default: 'inline',
    //   group: 'labels',
    //   disabled: {
    //     showLabels: false,
    //   },
    // }, 
    //TODO EDATOS FALTA CONTROLAR EL COLOR. HABRA QUE RELACIONARLO CON LAS DIMENSIONES GENERADAS EN LOS DATASETS
    // colorScale: {
    //   type: 'colorScale',
    //   label: 'Color scale',
    //   domain: 'colorDomain',
    //   default: {
    //     scaleType: 'ordinal',
    //     interpolator: 'interpolateSpectral',
    //   },
    //   group: 'colors',
    // },
  }