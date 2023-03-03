import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const arcsAggregators = getDimensionAggregator(
    'arcs',
    mapping,
    dataTypes,
    dimensions
  )
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    }
  }
  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = []
  d3.rollups(
    data,
    (v) => {
      let item = {
        series: v[0][mapping.series.value],
      }

      mapping.arcs.value.forEach((arcName, i) => {
        // getting i-th aggregator
        const aggregator = arcsAggregators[i]
        // use it
        item[arcName] = aggregator(v.map((d) => d[arcName]))
      })

      results.push(item)
    },
    (d) => d[mapping.series.value] // series grouping
  )

  return results
}

export function getChartOptions(
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions)
  resultMap.forEach((d) => {
    // compute the total value for each pie
    d.totalValue = d3.sum(mapping.arcs.value.map((arc) => d[arc]))
  })
  // const arcsSize = mapping.arcs.value.map(arc => ({
  //   name: arc,
  //   value: sum(resultMap.map(d => d[arc]))
  // })); // sort it, will be used later
  const filas = visualOptions.rowsNumber
  const spam = Math.max(
    Math.floor(100 / Math.ceil(resultMap.length / filas)) - 10,
    6
  )
  console.log('spam', spam)
  const regforraw = Math.ceil(resultMap.length / filas)
  console.log('regforraw', regforraw)
  var spamfilas = 100 / filas - 10
  var countreg = 0
  var left = 0
  var top = 0
  function calculoradio(radius) {
    if (visualOptions.drawDonut) {
      return [
        radius - visualOptions.arcTichkness + '%',
        visualOptions.arcTichkness + '%',
      ]
    } else {
      return radius + '%'
    }
  }

  function roseType() {
    if (visualOptions.nightingaleChart) {
      return visualOptions.nightingaleChartOption
    } else {
      return ''
    }
  }
  //TODO EDATOS EL CALCULO DE LA SERIE ESTA MAL PARA DIVIDIR LOS DISTRIBUIR LOS DIFERENTES GRAFICOS
  //HAY QUE CALCULAR BIEN Y DEMOMENTAR LA DIMIENSIÓN PARA PODER USARLO
  const pieSeries = resultMap.map(function (item, index) {
    console.log('pieSeriesitem', item)

    countreg = countreg + 1
    const map2 = new Map(Object.entries(item))
    const valuedentro = mapping.arcs.value.map((arc) => ({
      name: arc,
      value: map2.get(arc),
    }))

    var total = resultMap.length
    var radius = spam
    if (countreg <= regforraw) {
      top = spamfilas
      left = left + spam
    } else {
      top = top + spamfilas
      spamfilas = top
      countreg = 0
      left = spam
    }
    left = total === 1 ? 50 : left
    top = total === 1 || filas === 1 ? 50 : top
    radius = total === 1 ? 95 : radius
    return {
      name: item.series,
      type: 'pie',
      id: item.series,
      title: {
        text: item.series,
        show: true,
      },
      radius: calculoradio(radius),
      center: [left + '%', top + '%'],
      roseType: roseType(),
      label: {
        show: visualOptions.showSeriesLabels,
        position: visualOptions.showSeriesLabelsPosition,
      },
      emphasis: {
        focus: 'series',
        blurScope: 'coordinateSystem',
      },
      data: valuedentro,
      top: visualOptions.marginTop,
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      color: visualOptions.colorScale.userScaleValues.map((res) => res.range),
    }
  })
  console.log('pieSeries', pieSeries)
  return {
    legend: {
      show: visualOptions.showLegend,
      width: visualOptions.legendWidth,
      orient: visualOptions.legendOrient,
      right: visualOptions.legendMarginRight,
      top: visualOptions.legendMarginTop,
    },
    backgroundColor: visualOptions.background,
    tooltip: {}, //añadir a las opciones
    toolbox: {
      //añadir a las opciones
      show: visualOptions.showToolbox,
      feature: {
        saveAsImage: {},
        dataView: {
          title: 'Vista de datos',
        },
      },
    },
    series: [...pieSeries],
  }
}
