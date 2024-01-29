import { getOptionsConfig } from '@rawgraphs/rawgraphs-core';
import { visualOptions } from './visualOptions';
import {
  visualOptionsDateFormat,
  visualOptionsNumberFormat,
} from '../../constants';

export function getVisualOptionsConfig(mapping) {
  var customVisualOptions = { ...visualOptions };
  customVisualOptions.xAxisFormat = {
    ...visualOptions.xAxisFormat,
    ...axisFormat(visualOptions.xAxisFormat, mapping?.x?.mappedType),
  };
  const yAxisFormat = axisFormat(
    visualOptions.yAxisFormat,
    mapping?.y?.mappedType
  );
  customVisualOptions.yAxisFormat = {
    ...visualOptions.yAxisFormat,
    ...yAxisFormat,
  };
  customVisualOptions.tooltipValueFormat = {
    ...visualOptions.tooltipValueFormat,
    ...yAxisFormat,
  };
  return getOptionsConfig(customVisualOptions);
}

const axisFormat = (axisFormat, type) => {
  switch (type) {
    case 'date':
      return visualOptionsDateFormat;
    case 'number':
      return visualOptionsNumberFormat;
    default:
      return axisFormat;
  }
};
