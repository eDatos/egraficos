import * as d3 from 'd3'
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core'
import { parseObject } from '../utils/parseUtils'

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
        series: v[0][mapping.series.value], //get the first one since it's grouped
        bars: parseObject(v[0][mapping.bars.value]), // get the first one since it's grouped
        size: mapping.size.value
          ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
          : v.length, // aggregate. If not mapped, give 1 as size
      }
      results.push(item)
      return item
    },
    (d) => parseObject(d[mapping.series.value]), //series grouping
    (d) => parseObject(d[mapping.bars.value]) // bars grouping
  )

  return results
}

function categoryOptions(visualOptions, name) {
  return {
    name: visualOptions.showXaxisName ? name : '',
    nameLocation: visualOptions.xAxisNamePosition,
    nameGap: visualOptions.xAxisNameGap,
    type: 'category',
    axisLabel: {
      show: visualOptions.showXaxisLabels,
      rotate: visualOptions.showXaxisLabelsRotate,
      fontSize: visualOptions.showXaxisLabelsFontSize,
    },
  }
}

function valueOptions(visualOptions, name) {
  return {
    name: visualOptions.showYaxisName ? name : '',
    nameLocation: visualOptions.yAxisNamePosition,
    nameGap: visualOptions.yAxisNameGap,
    type: 'value',
    axisLabel: {
      show: visualOptions.showYaxisLabels,
      rotate: visualOptions.showYaxisLabelsRotate,
      fontSize: visualOptions.showYaxisLabelsFontSize,
    },
  }
}

const getxAxis = (visualOptions, name) => {
  if ('vertical' === visualOptions.barsOrientation) {
    return categoryOptions(visualOptions, name)
  } else {
    return valueOptions(visualOptions, name)
  }
}
const getyAxis = (visualOptions, name) => {
  if ('horizontal' === visualOptions.barsOrientation) {
    return categoryOptions(visualOptions, name)
  } else {
    return valueOptions(visualOptions, name)
  }
}

function getDimensions(resultMap, mapping) {
  if (mapping.series.value === undefined || mapping.series.value.length === 0) {
    return ['bars', 'size']
  } else {
    const dimensions = resultMap
      .map((res) => parseObject(res.series))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort()
    dimensions.unshift('bars')
    return dimensions
  }
}

function getSorterConfig(visualOptions, dimensions) {
  let sortBySize =
    'name' !== visualOptions.sortBarsBy &&
    dimensions.findIndex((d) => d === 'size') >= 0
  let dimension = sortBySize ? 'size' : 'bars'
  let order =
    sortBySize && 'totalDescending' === visualOptions.sortBarsBy
      ? 'desc'
      : 'asc'
  return {
    transform: {
      type: 'sort',
      config: { dimension, order },
    },
  }
}

function getDataset(resultMap, mapping, visualOptions) {
  const dimensions = getDimensions(resultMap, mapping)
  return [
    {
      dimensions: dimensions,
      source: resultMap.map((res) => {
        if (res.series) {
          return { bars: res.bars, [parseObject(res.series)]: res.size }
        }
        return res
      }),
    },
    getSorterConfig(visualOptions, dimensions),
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
    xAxis: getxAxis(visualOptions, mapping.bars.value),
    yAxis: getyAxis(visualOptions, mapping.size.value),
    series: [...barSeries],
  }
}
