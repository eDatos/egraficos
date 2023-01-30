import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'
import _ from 'lodash';

export const mapData = function (data, mapping, dataTypes, dimensions) {
  
  //TODO EDATOS DESCARTADO DE MOMENTO ¿NECESARIO?
  // const colorAggregator = getDimensionAggregator(
  //   'color',
  //   mapping,
  //   dataTypes,
  //   dimensions
  // )
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  )
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined
    };
  }
  if (mapping.color === undefined) {
    mapping.color = {
      value: undefined
    };
  }
  if (mapping.lines === undefined) {
    mapping.lines = {
      value: undefined
    };
  }

  let results = []

  d3.rollups(
    data,
    (v) =>
      d3.rollups(
        v,
        (vv) => {
          const item = {
            x: vv[0][mapping.x.value], //get the first one since it's grouped
            y: yAggregator[0](vv.map((d) => d[mapping.y.value])), // aggregate
            //color: colorAggregator(v.map((d) => d[mapping.color.value])), // aggregate
            series: vv[0][mapping.series.value], //get the first one since it's grouped
            lines: vv[0][mapping.lines.value], //get the first one since it's grouped
            [vv[0][mapping.lines.value]]: yAggregator[0](vv.map((d) => d[mapping.y.value]))
          }
          results.push(item)
        },
        (d) => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
      ),
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.lines.value] // group functions
  )

  return results
}
function getDimensions(resultMap, mapping) {
  if (mapping.lines.value === undefined || mapping.lines.value.length === 0) {
      return ['x', 'y']
    } else {
      var dimensions = resultMap.map(res =>res.lines).filter((value, index, self) => self.indexOf(value) === index).sort();
      dimensions.unshift('x')
      return dimensions
    }
}
function getDataset(resultMap, mapping, visualOptions) {
  return [{
    dimensions: getDimensions(resultMap, mapping),
    source: resultMap,
  },
  ]
  }
  const getxAxis = (visualOptions, datachart, resultMap) => {
    return {
        type: 'category',
         axisLabel: {
           show:visualOptions.showXaxisLabels,
           rotate: visualOptions.showXaxisLabelsRotate,
           fontSize:visualOptions.showXaxisLabelsFontSize
       },
    }
  }
export function getChartOptions (visualOptions, datachart, mapping, dataTypes, dimensions){
  const resultMap = mapData(datachart,mapping, dataTypes,dimensions)
  console.log('getChartOptionsresultMap', resultMap)
  resultMap.sort((a, b) => d3.ascending(a.x, b.x))
  resultMap.sort((a, b) => d3.ascending(a.lines, b.lines))
  //TODO EDATOS HAY QUE REVISAR PQ DEBERÍAN DE ESTAR AGRUPADOS POR LINES Y DENTRO DE CADA GRUPO ORDENADOS POR EL VALOR DE LA X(MENOS A MAYOR)
  //FALTA DARLE UNA VUELTA PARA QUE LOS GRUPOS ENTRE SI TB ESTEN ORDENADOS POR EL MENOR VALOR DE LA X
  var grouped = _.groupBy(resultMap, 'lines');

  for (var lines in grouped) {
    _.sortBy(grouped[lines], 'x');
  }
  let dimensiones = getDimensions(resultMap, mapping)
  const seriesSize = dimensiones.length-1;
  const lineSeries = getDimensions(resultMap, mapping).map(function (item, index) {
    if (index <seriesSize) {
      return { 
        type: 'line',
        smooth: true,
        step: visualOptions.stepCurve ? visualOptions.stepType: false,
        emphasis: { focus: 'series' },
        showSymbol: visualOptions.showPoints,
        symbolSize: visualOptions.dotsDiameter
    }
    } else {
      return {}
    }
  });
  return {
    legend: {
        show:visualOptions.showLegend,
        width:visualOptions.legendWidth, 
        orient:visualOptions.legendOrient,
        right:visualOptions.legendMarginRight,
        top:visualOptions.legendMarginTop
    },
    tooltip: {},//añadir a las opciones
    toolbox: {//añadir a las opciones
      show: visualOptions.showToolbox,
      feature: {
          saveAsImage: {},
          dataView: {
            title: 'Vista de datos'
        },
        dataZoom: {
        },
        restore: {}
      }
  },
  dataset:getDataset(resultMap, mapping, visualOptions),
  grid: {
     left:  visualOptions.marginLeft,
     right: visualOptions.marginRight,
     bottom: visualOptions.marginBottom,
     top: visualOptions.marginTop,
    containLabel: true
  },
    xAxis:getxAxis(visualOptions,datachart, resultMap),
    yAxis: {},
    series: [
      ...lineSeries,
    ],
  };
  }