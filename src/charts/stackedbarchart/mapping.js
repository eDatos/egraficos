import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { parseObject } from '../utils/parseUtils';
import { white } from '../../constants';

var getXAxisItem = (name, visualOptions) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'category' : 'value';
  return {
    name: visualOptions.showAxisName && type === 'category' ? name : '',
    nameLocation: visualOptions.axisNamePosition,
    nameGap: visualOptions.axisNameGap,
    type: type,
    axisLabel: {
      show: visualOptions.showXaxisLabels,
      rotate: visualOptions.showXaxisLabelsRotate,
      fontSize: visualOptions.showXaxisLabelsFontSize,
    },
  };
};

var getYAxisItem = (name, visualOptions) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'value' : 'category';
  return {
    name: visualOptions.showAxisName && type === 'category' ? name : '',
    nameLocation: visualOptions.axisNamePosition,
    nameGap: visualOptions.axisNameGap,
    type: type,
    axisLabel: {
      show: visualOptions.showYaxisLabels,
      rotate: visualOptions.showYaxisLabelsRotate,
      fontSize: visualOptions.showYaxisLabelsFontSize,
    },
  };
};

const getAxis = (mapData, item) => {
  if (item.type === 'category') {
    let data = mapData
      .map((item) => item.stacks)
      .filter((value, index, self) => self.indexOf(value) === index);
    item.data = data.sort();
  }
  return [item];
};

const colorValue = function (visualOptions, item) {
  return visualOptions.colorScale.userScaleValues.find((e) => e.domain === item)
    ?.range;
};

const getSeries = (mapData, bars, visualOptions) => {
  let series = [];
  bars.forEach((bar) => {
    let myData = mapData
      .filter((d) => d.bars === bar)
      .sort((a, b) => a.stacks - b.stacks);
    let myStacks = myData
      .map((item) => item.series)
      .filter((value, index, self) => self.indexOf(value) === index);
    myStacks.forEach((stack) => {
      const name = stack ? `${bar} - ${stack}` : bar;
      let serie = {
        name: name,
        type: 'bar',
        stack: stack ? stack : 'default',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderRadius: [2, 0, 0, 0],
          borderColor: white,
        },
        data: myData.filter((d) => d.series === stack).map((d) => d.size),
        color: colorValue(visualOptions, name),
      };
      series.push(serie);
    });
  });
  return series;
};

const mapData = function (data, mapping, dataTypes, dimensions) {
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const barsAggregators = getDimensionAggregator(
    'bars',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    };
  }

  let results = [];
  d3.rollups(
    data,
    (v) => {
      // use the spread operator to creat groups on mapping values
      // for every dimension in the bars field, create an item
      mapping.bars.value.forEach((barName, i) => {
        //getting values for aggregation
        const valuesForSize = v.map((x) => x[barName]);
        //getting i-th aggregator
        const aggregator = barsAggregators[i];

        // create the item
        const item = {
          series: v[0][mapping.series.value], // get the first one since it's grouped
          stacks: mapping.stacks?.value
            ? parseObject(v[0][mapping.stacks?.value])
            : '', // get the first one since it's grouped
          bars: barName,
          size: aggregator(valuesForSize),
        };
        results.push(item);
      });
    },
    (d) => d[mapping.series.value], // series grouping
    (d) => parseObject(d[mapping.stacks?.value]) // stacks grouping.
  );
  return results;
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
  let resultMap = mapData(datachart, mapping, dataTypes, dimensions);
  let series = getSeries(resultMap, mapping.bars.value, visualOptions);
  let axisName = mapping.stacks ? mapping.stacks.value : 'Size';
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
      axisPointer: {
        type: 'shadow',
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
    xAxis: getAxis(resultMap, getXAxisItem(axisName, visualOptions)),
    yAxis: getAxis(resultMap, getYAxisItem(axisName, visualOptions)),
    series: [...series],
  };
};
