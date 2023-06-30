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
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions);
  resultMap.forEach((d) => {
    // compute the total value for each pie
    d.totalValue = d3.sum(mapping.arcs.value.map((arc) => d[arc]));
  });
  // const arcsSize = mapping.arcs.value.map(arc => ({
  //   name: arc,
  //   value: sum(resultMap.map(d => d[arc]))
  // })); // sort it, will be used later
  const filas = visualOptions.rowsNumber;
  const spam = Math.max(
    Math.floor(100 / Math.ceil(resultMap.length / filas)) - 10,
    6
  );
  const regforraw = Math.ceil(resultMap.length / filas);
  var spamfilas = 100 / filas - 10;
  var countreg = 0;
  var left = 0;
  var top = 0;
  function calculoradio(radius) {
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
        return `${value} - ${percentValue}`;
      case 'percentage':
        return percentValue;
      default:
        return value;
    }
  };

  const pieSeries = resultMap.map(function (item, index) {
    countreg = countreg + 1;
    const map2 = new Map(Object.entries(item));
    var valuedentro = mapping.arcs.value.map((arc) => {
      return {
        name: arc,
        value: map2.get(arc),
      };
    });
    if (visualOptions.halfDonut) {
      const totalValue = valuedentro.reduce((acc, curr) => acc + curr.value, 0);
      valuedentro = [
        ...valuedentro,
        {
          value: totalValue,
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

    var total = resultMap.length;
    var radius = spam;
    if (countreg <= regforraw) {
      top = spamfilas;
      left = left + spam;
    } else {
      top = top + spamfilas;
      spamfilas = top;
      countreg = 0;
      left = spam;
    }
    left = total === 1 ? 50 : left;
    top = total === 1 || filas === 1 ? 50 : top;
    radius = total === 1 ? 95 : radius;
    return {
      name: item.series,
      type: 'pie',
      id: item.series,
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: white,
        borderWidth: visualOptions.borderWidth,
      },
      title: {
        text: item.series,
        show: true,
      },
      radius: calculoradio(radius),
      center: [left + '%', top + '%'],
      startAngle: visualOptions.halfDonut ? 180 : 90,
      roseType: roseType(),
      label: {
        show: visualOptions.showSeriesLabels,
        position: visualOptions.showSeriesLabelsPosition,
        formatter(param) {
          // correct the percentage
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
      data: valuedentro,
      top: visualOptions.marginTop,
      left: visualOptions.marginLeft,
      right: visualOptions.marginRight,
      bottom: visualOptions.marginBottom,
      color: visualOptions.colorScale.userScaleValues.map((res) => res.range),
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
    series: [...pieSeries],
  };
}
