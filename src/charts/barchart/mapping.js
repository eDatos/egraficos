import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators

//   const colorAggregator = getDimensionAggregator(
//     'color',
//     mapping,
//     dataTypes,
//     dimensions
//   )

  const sizeAggregator = getDimensionAggregator(
    'size',
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
  if (mapping.size === undefined) {
    mapping.size = {
      value: undefined
    };
  }

  let results = []

  const result = d3.rollups(
    data,
    (v) => {
      const item = {
        series: v[0][mapping.series.value], // get the first one since it's grouped
        bars: v[0][mapping.bars.value], // get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator(v.map((d) => d[mapping.size.value]))
          : v.length, // aggregate. If not mapped, give 1 as size
        // color: mapping.color.value
        //   ? colorAggregator(v.map((d) => d[mapping.color.value]))
        //   : 'default', // aggregate, by default single color.
      }
      results.push(item)
      return item
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => d[mapping.bars.value].toString() // bars grouping. toString() to enable grouping on dates
  )

  return results
}
const getxAxis = (visualOptions, datachart, resultMap) => {
    return {
        type: 'category',
        data: resultMap.map(res =>res.bars),
        axisLabel: {
          show:visualOptions.showXaxisLabels,
          rotate: visualOptions.showXaxisLabelsRotate,
          fontSize:visualOptions.showXaxisLabelsFontSize
      },
    }
  }
  const getyAxis = (visualOptions, datachart, resultMap) => {
  return {
  type: 'value'
  }
  }
export const getChartOptions = function (visualOptions, datachart, mapping, dataTypes, dimensions){
    const resultMap = mapData(datachart,mapping, dataTypes,dimensions)
    console.log('getChartOptionsresultMap', resultMap)
    //const barsDomain = rollups(resultMap, v => sum(v, d => d.size), d => d.bars, d => d.colors).sort(barsSortings[visualOptions.totalAscending]); // add grid
    //console.log('getChartOptionsbarsDomain', barsDomain)
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
    grid: {
      left:  visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      top: visualOptions.marginTop,
      containLabel: true
    },
      xAxis:getxAxis(visualOptions,datachart, resultMap),
      yAxis:getyAxis(visualOptions,datachart, resultMap),
       series: [{
          name: mapping.bars.value[0],
          type: 'bar',
          data: resultMap.map(res =>res.size),
          //añadir a las opciones
          //showBackground: true,
          // backgroundStyle: {
          //     color: visualOptions.background
          //   }
          color: visualOptions.colorScale.defaultColor
       }],
    };
    }