import { rollups } from 'd3';
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
d => d[mapping.bars.value].toString() // bars grouping. toString() to enable grouping on dates
);
console.log('getMappedData', results)
console.log('getMappedDatabar', results.map(res =>res.bars))
console.log('getMappedDatasize', results.map(res =>res.size))


return results;
}
export const getChartOptions = (visualOptions, datachart, mapping, dataTypes, dimensions) => {
    console.log('getChartOptionsvisualOptions', visualOptions)
    console.log('getChartOptionsdatachart', datachart)
    console.log('getChartOptionsmapping', mapping)
    const resultMap = getMappedData(datachart,mapping, dataTypes,dimensions)

    return {
        legend: {
            show:visualOptions.showLegend
        },
        tooltip: {},
        xAxis:getxAxis(visualOptions,datachart, resultMap),
        yAxis:getyAxis(visualOptions,datachart, resultMap),
         series: [{
            name: mapping.bars.value[0],
            type: 'bar',
            data: resultMap.map(res =>res.size),
            showBackground: true,
            backgroundStyle: {
                color: visualOptions.background
              }
         }],
         color: visualOptions.colorScale.defaultColor
    };

}