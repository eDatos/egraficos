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
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'labels',
    name: 'Labels',
    operation: 'get',
    required: false,
    validTypes: ['string'],
  },
];
