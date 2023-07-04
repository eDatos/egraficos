import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { parseObject } from '../utils/parseUtils';
import * as d3 from 'd3';
import { grayPalette, white } from '../../constants';

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

  function getLevelOption() {
    return [
      {
        color: visualOptions.colorScale.userScaleValues.map((v) => v.range),
        itemStyle: {
          borderColor: visualOptions.gapColor,
          borderWidth: 0,
          gapWidth: visualOptions.gapWidth,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: visualOptions.borderColor,
          borderWidth: visualOptions.borderWidth,
          gapWidth: visualOptions.gapWidth,
        },
        emphasis: {
          itemStyle: {
            borderColor: grayPalette[2],
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: visualOptions.borderWidth,
          gapWidth: visualOptions.gapWidth,
          borderColorSaturation: 0.6,
        },
      },
    ];
  }

  function dataHierarchy(index, data) {
    const allValues = [...mapping.hierarchy.value];
    const hierarchy = allValues.splice(0, index + 1);
    let results = [];
    d3.rollups(
      data,
      (v) => {
        let children = [];
        if (index < mapping.hierarchy.value.length - 1) {
          const childrenData = data.filter(
            (d) => d[hierarchy[index]] === v[0][hierarchy[index]]
          );
          children = dataHierarchy(index + 1, childrenData);
        }
        const item = {
          name: parseObject(v[0][hierarchy[index]]),
          value:
            mapping.size.value && sizeAggregator[0]
              ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
              : v.length,
          path: hierarchy.reduce(
            (acc, curr) => (acc === '' ? curr : `${acc}/${curr}`),
            ''
          ),
          children: children,
        };
        results.push(item);
        return item;
      },
      ...hierarchy.map((level) => (d) => d[level])
    );
    return results;
  }

  return [
    {
      type: 'treemap',
      name: mapping.hierarchy.value[0],
      label: {
        show: visualOptions.showLabel,
        formatter: '{b}',
      },
      upperLabel: {
        show: visualOptions.showUpperLabel,
        height: 30,
      },
      itemStyle: {
        borderColor: white,
      },
      levels: getLevelOption(),
      data: dataHierarchy(0, data),
    },
  ];
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
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
    series: getSeries(visualOptions, datachart, mapping, dataTypes, dimensions),
  };
};
