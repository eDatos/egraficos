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
console.log('sizeAggregator',sizeAggregator)
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

  d3.rollups(
    data,
    (v) => {
      const item = {
        series: v[0][mapping.series.value], // get the first one since it's grouped
        bars: v[0][mapping.bars.value], // get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
          : v.length, // aggregate. If not mapped, give 1 as size
        [v[0][mapping.series.value]]: mapping.size.value
        ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
        : v.length

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
        axisLabel: {
          show:visualOptions.showXaxisLabels,
          rotate: visualOptions.showXaxisLabelsRotate,
          fontSize:visualOptions.showXaxisLabelsFontSize
      },
    }
  }
  function getDimensions(resultMap, mapping) {
    console.log('getDimensions mapping.series',mapping.series)

    if (mapping.series.value === undefined || mapping.series.value.length === 0) {
        return ['bars', 'size']
      } else {
        var dimensions = resultMap.map(res =>res.series).filter((value, index, self) => self.indexOf(value) === index).sort();
        dimensions.unshift('bars')
        console.log('getDimensions series',dimensions)
        return dimensions
      }
  }

  function getSorterConfig(resultMap, mapping, visualOptions) {
    if ("name" === visualOptions.sortBarsBy) {
      return {
        transform: { 
          type: 'sort',
          config: {dimension: 'bars', order: 'asc'}
        }
      }
    }
    if ("totalDescending" === visualOptions.sortBarsBy) {
      return {
        transform: { 
          type: 'sort',
          config: {dimension: 'size', order: 'desc'}
        }
      }
    }
    if ("totalAscending" === visualOptions.sortBarsBy) {
      return {
        transform: { 
          type: 'sort',
          config: {dimension: 'size', order: 'asc'}
        }
      }
    }
  }
  function getDataset(resultMap, mapping, visualOptions) {
return [{
  dimensions: getDimensions(resultMap, mapping),
  source: resultMap,
},
  getSorterConfig(resultMap, mapping, visualOptions)
]
}
export const getChartOptions = function (visualOptions, datachart, mapping, dataTypes, dimensions){
    const resultMap = mapData(datachart,mapping, dataTypes,dimensions)
    console.log('getChartOptionsresultMap', resultMap)
    let dimensiones = getDimensions(resultMap, mapping)
    console.log('getChartOptionsdimensiones', dimensiones)
    const seriesSize = dimensiones.length-1;
    const barSeries = dimensiones.map(function (item, index) {
      console.log('getDimensionsseriesSize', seriesSize)
      console.log('getDimensionsindex', index)
      if (index <seriesSize) {
        return { 
          type: 'bar',
          datasetIndex: visualOptions.sortBarsBy !== "original" ? 1 : 0
      }
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
        ...barSeries,
      ],
    };
    }