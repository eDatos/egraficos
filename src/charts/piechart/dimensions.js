export const dimensions = [{
    id: 'arcs',
    name: 'Arcs',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    aggregation: true,
    aggregationDefault: {
      number: 'sum'
    }
  }, 
  //TODO EDATOS HAY QUE AÑADIRLO. COMENTADO PQ NO ESTA BIEN CONTROLADA LA SERIE
  // {
  //   id: 'series',
  //   name: 'Series',
  //   validTypes: ['number', 'date', 'string'],
  //   required: false,
  //   operation: 'get'
  // }
];
  