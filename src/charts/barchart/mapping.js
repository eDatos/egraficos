import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'

const mapData = function (data, mapping, dataTypes, dimensions) {
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  )
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    }
  }
  if (mapping.color === undefined) {
    mapping.color = {
      value: undefined,
    }
  }
  if (mapping.size === undefined) {
    mapping.size = {
      value: undefined,
    }
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
          : v.length,
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
  if ('vertical' === visualOptions.barsOrientation) {
    return {
      type: 'category',
      axisLabel: {
        show: visualOptions.showXaxisLabels,
        rotate: visualOptions.showXaxisLabelsRotate,
        fontSize: visualOptions.showXaxisLabelsFontSize,
      },
    }
  } else {
    return {
      type: 'value',
    }
  }
}
const getyAxis = (visualOptions, datachart, resultMap) => {
  if ('horizontal' === visualOptions.barsOrientation) {
    return {
      type: 'category',
      axisLabel: {
        show: visualOptions.showXaxisLabels,
        rotate: visualOptions.showXaxisLabelsRotate,
        fontSize: visualOptions.showXaxisLabelsFontSize,
      },
    }
  } else {
    return {
      type: 'value',
    }
  }
}
function getDimensions(resultMap, mapping) {
  if (mapping.series.value === undefined || mapping.series.value.length === 0) {
    return ['bars', 'size']
  } else {
    var dimensions = resultMap
      .map((res) => res.series)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
    dimensions.unshift('bars')
    dimensions.push('size')
    return dimensions
  }
}

function getSorterConfig(resultMap, mapping, visualOptions) {
  if ('name' === visualOptions.sortBarsBy) {
    return {
      transform: {
        type: 'sort',
        config: { dimension: 'bars', order: 'asc' },
      },
    }
  }
  if ('totalDescending' === visualOptions.sortBarsBy) {
    return {
      transform: {
        type: 'sort',
        config: { dimension: 'size', order: 'desc' },
      },
    }
  }
  if ('totalAscending' === visualOptions.sortBarsBy) {
    return {
      transform: {
        type: 'sort',
        config: { dimension: 'size', order: 'asc' },
      },
    }
  }
}
function getDataset(resultMap, mapping, visualOptions) {
  return [
    {
      dimensions: getDimensions(resultMap, mapping),
      source: resultMap,
    },
    getSorterConfig(resultMap, mapping, visualOptions),
  ]
}
export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions)
  let dimensiones = getDimensions(resultMap, mapping)
  const barSeries = dimensiones.splice(1).map(function (item, index) {
    let colorValue
    if (visualOptions.colorScale.userScaleValues?.length === 1) {
      colorValue = visualOptions.colorScale.userScaleValues[0].range
    } else {
      switch (visualOptions.colorScale.scaleType) {
        case 'ordinal':
          colorValue = visualOptions.colorScale.userScaleValues.find(
            (e) => e.domain === item
          )?.range
          break
        case 'sequential':
          colorValue = visualOptions.colorScale.userScaleValues.map(
            (res) => res.range
          )
          break
        default:
          colorValue = visualOptions.colorScale.defaultColor
      }
    }
    return {
      type: 'bar',
      datasetIndex: visualOptions.sortBarsBy !== 'original' ? 1 : 0,
      color: colorValue,
    }
  })

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
        dataZoom: {},
        restore: {},
      },
    },
    dataset: getDataset(resultMap, mapping, visualOptions),
    grid: {
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      top: visualOptions.marginTop,
      containLabel: true,
    },
    xAxis: getxAxis(visualOptions, datachart, resultMap),
    yAxis: getyAxis(visualOptions, datachart, resultMap),
    series: [...barSeries],
  }
}
