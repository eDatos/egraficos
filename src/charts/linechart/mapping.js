import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  
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

  const result = d3.rollups(
    data,
    (v) =>
      d3.rollups(
        v,
        (vv) => {
          console.log('yagregator', yAggregator[0](vv.map((d) => d[mapping.y.value])))
          const item = {
            x: vv[0][mapping.x.value], //get the first one since it's grouped
            y: yAggregator[0](vv.map((d) => d[mapping.y.value])), // aggregate
            //color: colorAggregator(v.map((d) => d[mapping.color.value])), // aggregate
            series: vv[0][mapping.series.value], //get the first one since it's grouped
            lines: vv[0][mapping.lines.value], //get the first one since it's grouped
            [vv[0][mapping.lines.value]]: yAggregator[0](vv.map((d) => d[mapping.y.value]))
          }
          console.log('item dentro', item)
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
  console.log('getDimensions mapping.series',mapping.series)

  if (mapping.lines.value === undefined || mapping.lines.value === 0) {
      return ['x', 'y']
    } else {
      var dimensions = resultMap.map(res =>res.lines).filter((value, index, self) => self.indexOf(value) === index).sort();
      dimensions.unshift('x')
      console.log('getDimensions series',dimensions)
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
      //   axisLabel: {
      //     show:visualOptions.showXaxisLabels,
      //     rotate: visualOptions.showXaxisLabelsRotate,
      //     fontSize:visualOptions.showXaxisLabelsFontSize
      // },
    }
  }
  const getSeries = (visualOptions, mapping, resultMap) => {
    return [
      { 
        type: 'line',
        smooth: true,
        seriesLayoutBy: 'row',
        emphasis: { focus: 'series' }
  }]
  }
export function getChartOptions (visualOptions, datachart, mapping, dataTypes, dimensions){
  const resultMap = mapData(datachart,mapping, dataTypes,dimensions)
  console.log('getChartOptionsresultMap', resultMap)
  resultMap.sort((a, b) => d3.ascending(a.x, b.x))
  resultMap.sort((a, b) => d3.ascending(a.lines, b.lines))
  console.log('getChartOptionsresultnestedData', resultMap)
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
    series: getSeries(visualOptions,mapping, resultMap)
  };
  }