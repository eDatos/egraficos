import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import _ from 'lodash';
import { parseObject } from '../utils/parseUtils';

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.lines === undefined) {
    mapping.lines = {
      value: undefined,
    };
  }

  const multiplesLines = mapping.lines.value?.length > 0;
  let results = [];

  d3.rollups(
    data,
    (v) =>
      d3.rollups(
        v,
        (vv) => {
          const item = {
            x: vv[0][mapping.x.value], //get the first one since it's grouped
            y: yAggregator[0](vv.map((d) => d[mapping.y.value])), // aggregate
            lines: multiplesLines
              ? parseObject(vv[0][mapping.lines.value])
              : 'y', //get the first one since it's grouped
          };
          results.push(item);
        },
        (d) => d[mapping.x.value].toString() // sub-group functions. toString() to enable grouping on dates
      ),
    (d) => parseObject(d[mapping.lines.value]) // group functions
  );

  return results;
};
function getDimensions(resultMap, mapping) {
  if (mapping.lines.value === undefined || mapping.lines.value.length === 0) {
    return ['x', 'y'];
  } else {
    var dimensions = resultMap
      .map((res) => parseObject(res.lines))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    dimensions.unshift('x');
    return dimensions;
  }
}

function getXData(resultMap) {
  let xData = [];
  resultMap.forEach((e) => {
    let value = e.x;
    if (xData.indexOf(value) === -1) {
      xData.push(value);
    }
  });
  return xData.sort((a, b) => a - b);
}

const getXAxis = (visualOptions, xData, name) => {
  return {
    name: visualOptions.showXaxisName ? name : '',
    nameLocation: visualOptions.xAxisNamePosition,
    nameGap: visualOptions.xAxisNameGap,
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      show: visualOptions.showXaxisLabels,
      rotate: visualOptions.showXaxisLabelsRotate,
      fontSize: visualOptions.showXaxisLabelsFontSize,
    },
    data: xData.map((data) => parseObject(data)),
  };
};

const getYAxis = (visualOptions, name) => {
  return {
    name: visualOptions.showYaxisName ? name : '',
    nameLocation: visualOptions.yAxisNamePosition,
    nameGap: visualOptions.yAxisNameGap,
    axisLabel: {
      show: visualOptions.showYaxisLabels,
      rotate: visualOptions.showYaxisLabelsRotate,
      fontSize: visualOptions.showYaxisLabelsFontSize,
    },
  };
};

export function getChartOptions(
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions);
  const xData = getXData(resultMap);

  let data = _.groupBy(resultMap, 'lines');

  const lineSeries = getDimensions(resultMap, mapping)
    .filter((dimension) => dimension !== 'x')
    .map(function (item, index) {
      let colorValue;
      if (visualOptions.colorScale.userScaleValues?.length === 1) {
        colorValue = visualOptions.colorScale.userScaleValues[0].range;
      } else {
        colorValue = visualOptions.colorScale.userScaleValues.find(
          (e) => e.domain === item
        )?.range;
      }
      let lineData = [];
      xData.forEach((e) => {
        let value = _.find(data[item], ['x', e], 0);
        if (value) {
          lineData.push(value.y);
        } else {
          lineData.push('');
        }
      });
      return {
        name: item,
        type: 'line',
        smooth: true,
        step: visualOptions.stepCurve ? visualOptions.stepType : false,
        emphasis: { focus: 'series' },
        showSymbol: visualOptions.showPoints,
        symbolSize: visualOptions.dotsDiameter,
        color: colorValue,
        data: lineData,
      };
    });

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
    grid: {
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      top: visualOptions.marginTop,
      containLabel: true,
    },
    xAxis: getXAxis(visualOptions, xData, mapping.x.value),
    yAxis: getYAxis(visualOptions, mapping.y.value),
    series: [...lineSeries],
  };
}
