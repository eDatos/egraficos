import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { parseObject } from '../utils/parseUtils';
import * as d3 from 'd3';

const getSeries = (visualOptions, data, mapping, dataTypes, dimensions) => {
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.size === undefined) {
    mapping.size = {
      value: undefined,
    };
  }  

  let results = [];
  d3.rollups(
    data, (v) => {
      const item = {
        name: parseObject(v[0][mapping.hierarchy.value]),
        value: mapping.size.value ? sizeAggregator[0](v.map((d) => d[mapping.size.value])) : v.length
      };
      results.push(item);
      return item;
    },
    (d) => parseObject(d[mapping.hierarchy.value]) //hierarchy grouping
  );    

  return [
    {
      type: 'treemap',
      data: results
    }
  ];
}

export const getChartOptions = function (visualOptions, datachart, mapping, dataTypes,
  dimensions) {
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
    series: getSeries(visualOptions, datachart, mapping, dataTypes,
      dimensions)
  };
};
