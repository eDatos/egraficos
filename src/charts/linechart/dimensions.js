export const dimensions = [
  {
    id: 'x',
    name: 'X Axis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },

  {
    id: 'y',
    name: 'Y Axis',
    operation: 'get',
    validTypes: ['number'],
    required: true,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'lines',
    name: 'Lines',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];
