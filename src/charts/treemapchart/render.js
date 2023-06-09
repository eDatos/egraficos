export function colorDomain(data, mapping) {
  const domain = mapping.hierarchy.value;
  return {
    domain,
    type: 'string',
  };
}
