import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { white } from '../../constants';

export const mapData = function (data, mapping, dataTypes, dimensions) {
  // define aggregators
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const arcsAggregators = getDimensionAggregator(
    'arcs',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    };
  }
  // we will use rollup to populate a flat array of objects
  // that will be passed to the render
  let results = [];
  d3.rollups(
    data,
    (v) => {
      let item = {
        series: v[0][mapping.series.value],
      };

      mapping.arcs.value.forEach((arcName, i) => {
        // getting i-th aggregator
        const aggregator = arcsAggregators[i];
        // use it
        item[arcName] = aggregator(v.map((d) => d[arcName]));
      });

      results.push(item);
    },
    (d) => d[mapping.series.value] // series grouping
  );

  return results;
};

export function getChartOptions(
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions
) {
  if (mapping.arcs.value.length > 1 && mapping.series?.value?.length > 0) {
    throw new Error('No more than one arc is allowed if series is selected');
  }
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions).reduce(
    (acc, curr) => {
      if (curr.series) {
        acc[curr.series] = curr[mapping.arcs.value[0]];
      } else {
        Object.keys(curr).forEach((key) => (acc[key] = curr[key]));
      }
      return acc;
    },
    {}
  );
  function calculateRadius(radius) {
    if (visualOptions.drawDonut) {
      return [
        visualOptions.arcTichkness + '%',
        radius - visualOptions.arcTichkness + '%',
      ];
    } else {
      return radius + '%';
    }
  }

  function roseType() {
    if (visualOptions.nightingaleChart) {
      return visualOptions.nightingaleChartOption;
    } else {
      return '';
    }
  }

  const labelValue = (visualOptions, value, percent) => {
    let percentValue = (visualOptions.halfDonut ? percent * 2 : percent) + '%';
    switch (visualOptions.showValueAndPercentage) {
      case 'both':
        return `${value}${visualOptions.units} - ${percentValue}`;
      case 'percentage':
        return percentValue;
      default:
        return value + visualOptions.units;
    }
  };

  const data = (item, visualOptions) => {
    const arcs = Object.entries(item)
      .flatMap(([key, value]) => (value > 0 ? { name: key, value } : []))
      .sort((a, b) => {
        switch (visualOptions.sortBy) {
          case 'totalDescending':
            return b.value - a.value;
          case 'totalAscending':
            return a.value - b.value;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    if (visualOptions.halfDonut) {
      return [
        ...arcs,
        {
          value: arcs.reduce((acc, curr) => acc + curr.value, 0),
          itemStyle: {
            // stop the chart from rendering this piece
            color: 'none',
            decal: {
              symbol: 'none',
            },
          },
          label: {
            show: false,
          },
        },
      ];
    }
    return arcs;
  };

  const pieSeries = () => {
    const defaultRadius = 85;
    return {
      type: 'pie',
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: white,
        borderWidth: visualOptions.borderWidth,
      },
      radius: calculateRadius(defaultRadius),
      startAngle: visualOptions.halfDonut ? 180 : 90,
      roseType: roseType(),
      label: {
        show: visualOptions.showSeriesLabels,
        position: visualOptions.showSeriesLabelsPosition,
        formatter(param) {
          const value = visualOptions.showValueOnSeriesLabels
            ? `(${labelValue(visualOptions, param.value, param.percent)})`
            : '';
          return `${param.name} ${value}`;
        },
      },
      emphasis: {
        focus: 'series',
        blurScope: 'coordinateSystem',
      },
      data: data(resultMap, visualOptions),
      top: visualOptions.marginTop,
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      color: visualOptions.colorScale.userScaleValues.map((res) => res.range),
    };
  };

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
      formatter: function (params) {
        var colorSpan = (color) =>
          '<span class="tooltip-circle" style="background-color:' +
          color +
          '"></span>';
        const value = labelValue(visualOptions, params.value, params.percent);
        return `${colorSpan(params.color)} ${params.name} <b>${value}</b>`;
      },
    }, //añadir a las opciones
    toolbox: {
      //añadir a las opciones
      show: visualOptions.showToolbox,
      feature: {
        saveAsImage: {},
        dataView: {
          title: 'Vista de datos',
        },
      },
    },
    series: [pieSeries()],
  };
}
