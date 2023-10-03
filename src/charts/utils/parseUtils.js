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

export const format = (data, format, locale, type) => {
  if (format === 'original') {
    return data;
  }
  switch (type) {
    case 'date':
      return moment(data).locale(locale).format(dateParsersPatterns[format]);
    case 'number':
      return new Intl.NumberFormat(locale, {
        notation: format ?? 'standard',
      }).format(data);
    default:
      return data;
  }
};

export const diff = (a, b, type) => {
  switch (type) {
    case 'date':
      return moment(a).diff(b);
    default:
      return a - b;
  }
};
