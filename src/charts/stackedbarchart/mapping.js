import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { diff, format, parseObject } from '../utils/parseUtils';
import { white } from '../../constants';

const sortFunction = (a, b, sortBarsBy, type) => {
  switch (sortBarsBy) {
    case 'original':
      return 0;
    case 'name':
    default:
      return a.stacks ? diff(a.stacks, b.stacks, type) : diff(a, b, type);
  }
};

var getAxisItem = (
  name,
  type,
  axisLabel,
  axisLabelRotate,
  axisLabelFontSize,
  visualOptions,
  stacks,
  locale
) => {
  return {
    name: visualOptions.showBarsName && type === 'category' ? name : '',
    nameLocation: visualOptions.barsNameLocation,
    nameGap: visualOptions.barsNameGap,
    type: type,
    axisLabel: {
      show: axisLabel,
      rotate: axisLabelRotate,
      fontSize: axisLabelFontSize,
      formatter: (param) => {
        if (type === 'category') {
          return format(
            param,
            visualOptions.barsLabelsFormat,
            locale,
            stacks?.mappedType
          );
        }
        return param;
      },
    },
  };
};

var getXAxisItem = (name, visualOptions, stacks, locale) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'category' : 'value';
  return getAxisItem(
    name,
    type,
    visualOptions.showXaxisLabels,
    visualOptions.showXaxisLabelsRotate,
    visualOptions.showXaxisLabelsFontSize,
    visualOptions,
    stacks,
    locale
  );
};

var getYAxisItem = (name, visualOptions, stacks, locale) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'value' : 'category';
  return getAxisItem(
    name,
    type,
    visualOptions.showYaxisLabels,
    visualOptions.showYaxisLabelsRotate,
    visualOptions.showYaxisLabelsFontSize,
    visualOptions,
    stacks,
    locale
  );
};

const getAxis = (mapData, item, sortBarsBy, stacksType) => {
  if (item.type === 'category') {
    let data = mapData
      .map((item) => item.stacks ?? '')
      .filter((value, index, self) => self.indexOf(value) === index);
    item.data = data.sort((a, b) => sortFunction(a, b, sortBarsBy, stacksType));
  }
  return [item];
};

const colorValue = function (visualOptions, item) {
  return visualOptions.colorScale.userScaleValues.find((e) => e.domain === item)
    ?.range;
};

const getSeries = (mapData, bars, visualOptions, stacksType) => {
  let series = [];
  bars.forEach((bar) => {
    let myData = mapData
      .filter((d) => d.bars === bar)
      .sort((a, b) => sortFunction(a, b, visualOptions.sortBarsBy, stacksType));
    let myStacks = myData
      .map((item) => item.series)
      .filter((value, index, self) => self.indexOf(value) === index);
    myStacks.forEach((stack) => {
      const name = stack
        ? visualOptions.groupSeriesInStack
          ? stack
          : `${bar} - ${stack}`
        : bar;
      let serie = {
        name: name,
        type: 'bar',
        stack: stack && !visualOptions.groupSeriesInStack ? stack : 'default',
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

const mapData = function (
  data,
  mapping,
  dataTypes,
  dimensions,
  barsLabelsFormat,
  locale
) {
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
    (d) =>
      format(
        d[mapping.stacks?.value],
        barsLabelsFormat,
        locale,
        mapping.stacks?.mappedType
      ) // stacks grouping.
  );
  return results;
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
  let resultMap = mapData(
    datachart,
    mapping,
    dataTypes,
    dimensions,
    visualOptions.barsLabelsFormat,
    locale
  );
  let series = getSeries(
    resultMap,
    mapping.bars.value,
    visualOptions,
    mapping.stacks?.mappedType
  );
  let categoryName = visualOptions.customBarsName
    ? visualOptions.customBarsName
    : mapping.stacks?.value ?? 'Size';
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
      formatter: function (params) {
        var colorSpan = (color) =>
          '<span class="tooltip-circle" style="background-color:' +
          color +
          '"></span>';
        return `${params.seriesName}<br/>${colorSpan(params.color)} ${format(
          params.name,
          visualOptions.barsLabelsFormat,
          locale,
          mapping.stacks?.mappedType
        )}&nbsp;&nbsp;&nbsp;<b>${params.value}${visualOptions.units}</b>`;
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
      resultMap,
      getXAxisItem(categoryName, visualOptions, mapping.stacks, locale),
      visualOptions.sortBarsBy,
      mapping.stacks?.mappedType
    ),
    yAxis: getAxis(
      resultMap,
      getYAxisItem(categoryName, visualOptions, mapping.stacks, locale),
      visualOptions.sortBarsBy,
      mapping.stacks?.mappedType
    ),
    series: [...series],
  };
};
