import { rollups,ascending, descending, sum } from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';

const getxAxis = (visualOptions, datachart, resultMap) => {
        return {
            type: 'category',
             data: resultMap.map(res =>res.bars),
        }
}
const getyAxis = (visualOptions, datachart, resultMap) => {
return {
    type: 'value'
}
}
const barsSortings = {
  totalDescending: function (a, b) {
    return descending(a[1], b[1]);
  },
  totalAscending: function (a, b) {
    return ascending(a[1], b[1]);
  },
  name: function (a, b) {
    return ascending(a[0], b[0]);
  },
  original: function (a, b) {
    return true;
  }
}; // bars domain
const getMappedData = (data, mapping, dataTypes, dimensions) => {
const colorAggregator = getDimensionAggregator('color', mapping, dataTypes, dimensions);
const sizeAggregator = getDimensionAggregator('size', mapping, dataTypes, dimensions); // add the non-compulsory dimensions.
     mapping.color = {
      value: undefined
    };
    mapping.series = {
        value: undefined
    };
    mapping.size = {
    value: undefined
    };
let results = [];
rollups(data, v => {
  const item = {
    series: v[0][mapping.series.value],
    // get the first one since it's grouped
    bars: v[0][mapping.bars.value],
    // get the first one since it's grouped
    size: mapping.size.value ? sizeAggregator(v.map(d => d[mapping.size.value])) : v.length,
    // aggregate. If not mapped, give 1 as size
    color: mapping.color.value ? colorAggregator(v.map(d => d[mapping.color.value])) : 'default' // aggregate, by default single color.

  };
  results.push(item);
  return item;
}, d => d[mapping.series.value], // series grouping
d => d[mapping.bars.value] // bars grouping. toString() to enable grouping on dates
);
return results;
}
export const getChartOptions = (visualOptions, datachart, mapping, dataTypes, dimensions) => {
    console.log('getChartOptionsvisualOptions', visualOptions)
    console.log('getChartOptionsdatachart', datachart)
    console.log('getChartOptionsmapping', mapping)
    const resultMap = getMappedData(datachart,mapping, dataTypes,dimensions)
    console.log('getMappedDataresultMap', resultMap)
    const barsDomain = rollups(resultMap, v => sum(v, d => d.size), d => d.bars, d => d.colors).sort(barsSortings[visualOptions.totalAscending]); // add grid
    console.log('getChartOptionsbarsDomain', barsDomain)

    return {
        legend: {
            show:visualOptions.showLegend
        },
        tooltip: {},//añadir a las opciones
        toolbox: {//añadir a las opciones
          feature: {
              saveAsImage: {},
              dataView: {
                show: true,
                title: 'Data View'
            },
          }
      },
        xAxis:getxAxis(visualOptions,datachart, resultMap),
        yAxis:getyAxis(visualOptions,datachart, resultMap),
         series: [{
            name: mapping.bars.value[0],
            type: 'bar',
            data: resultMap.map(res =>res.size),
            //añadir a las opciones
            //showBackground: true,
            // backgroundStyle: {
            //     color: visualOptions.background
            //   }
         }],
         color: visualOptions.colorScale.defaultColor
    };

}