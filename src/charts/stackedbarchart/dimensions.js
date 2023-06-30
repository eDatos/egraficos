export const dimensions = [
  {
    id: 'stacks',
    name: 'Axis',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },

  {
    id: 'bars',
    name: 'Size',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
    },
  },

  {
    id: 'series',
    name: 'Series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];
