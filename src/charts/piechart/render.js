export function colorDomain(data, mapping) {
  const domain = mapping.arcs.value
  return {
    domain,
    type: 'number',
  }
}
