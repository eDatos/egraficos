import _ from 'lodash';
import { parseObjectToValue } from '../utils/parseUtils';

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
  };
};

const getSeries = (visualOptions, data, mapping) => {
  let grouped = mapping.labels?.value[0]
    ? _.groupBy(data, mapping.labels.value[0])
    : data;
  return [...new Set(data.map((item) => item[mapping.labels?.value]))].map(
    (item) => {
      const myData = (item ? grouped[item] : grouped)
        .map((d) => [
          parseObjectToValue(d[mapping.x.value]),
          parseObjectToValue(d[mapping.y.value]),
        ])
        .reduce((accumulator, currentValue) => {
          let findIndex = accumulator.findIndex(
            (d) => d[0] === currentValue[0] && d[1] === currentValue[1]
          );
          if (findIndex < 0) {
            return [...accumulator, [currentValue[0], currentValue[1], 1]];
          } else {
            accumulator[findIndex][2] += 1;
          }
          return accumulator;
        }, []);
      return {
        name: item ? item : mapping.y.value[0],
        type: 'scatter',
        data: myData,
        symbolSize: (data) => data[2] + visualOptions.symbolSize,
        color: item
          ? visualOptions.colorScale.userScaleValues.find(
              (e) => e.domain === item
            )?.range
          : visualOptions.colorScale.userScaleValues[0].range,
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter: (param) => param.data[2],
            position: 'top',
          },
        },
      };
    }
  );
};

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
    tooltip: {},
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
  };
};
