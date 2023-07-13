import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/ca';
import { dateParsersPatterns } from '../../constants';

export const parseObject = (data) => {
  return data instanceof Date ? data.toJSON() : data;
};

export const parseObjectToValue = (data) => {
  return data instanceof Date ? data.getTime() : data;
};

export const format = (data, format, locale) => {
  if (format === 'original') {
    return data;
  }
  return moment(data).locale(locale).format(dateParsersPatterns[format]);
};
