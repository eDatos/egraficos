import _ from 'lodash'

const getAxis = (
  showName,
  name,
  nameLocation,
  nameGap,
  scale,
  showaxisLabels,
  showaxisLabelsRotate,
  showaxisLabelsFontSize
) => {
  return {
    name: showName ? name : '',
    nameLocation: nameLocation,
    nameGap: nameGap,
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: showaxisLabels,
      rotate: showaxisLabelsRotate,
      fontSize: showaxisLabelsFontSize,
    },
    scale: scale,
  }
}

const getSeries = (visualOptions, data, mapping) => {
  let grouped = mapping.labels?.value[0]
    ? _.groupBy(data, mapping.labels.value[0])
    : data
  return [...new Set(data.map((item) => item[mapping.labels?.value]))].map(
    (item) => {
      const myData = (item ? grouped[item] : grouped).map((d) => [
        d[mapping.x.value],
        d[mapping.y.value],
        d[mapping.size?.value],
      ])
      return {
        name: item,
        type: 'scatter',
        symbolSize: visualOptions.symbolSize,
        data: myData,
        color: item
          ? visualOptions.colorScale.userScaleValues.find(
              (e) => e.domain === item
            )?.range
          : visualOptions.colorScale.userScaleValues[0].range,
      }
    }
  )
}

export const getChartOptions = function (visualOptions, datachart, mapping) {
  return {
    legend: {
      show: visualOptions.showLegend,
      width: visualOptions.legendWidth,
      orient: visualOptions.legendOrient,
      right: visualOptions.legendMarginRight,
      top: visualOptions.legendMarginTop,
    },
    backgroundColor: visualOptions.background,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
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
    grid: {
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      top: visualOptions.marginTop,
      containLabel: true,
    },
    xAxis: getAxis(
      visualOptions.showXaxisName,
      mapping.x.value[0],
      visualOptions.xAxisNamePosition,
      visualOptions.xAxisNameGap,
      !visualOptions.xAxisOriginTo0,
      visualOptions.showXaxisLabels,
      visualOptions.showXaxisLabelsRotate,
      visualOptions.showXaxisLabelsFontSize
    ),
    yAxis: getAxis(
      visualOptions.showYaxisName,
      mapping.y.value[0],
      visualOptions.yAxisNamePosition,
      visualOptions.yAxisNameGap,
      !visualOptions.yAxisOriginTo0,
      visualOptions.showYaxisLabels,
      visualOptions.showYaxisLabelsRotate,
      visualOptions.showYaxisLabelsFontSize
    ),
    series: getSeries(visualOptions, datachart, mapping),
  }
}
