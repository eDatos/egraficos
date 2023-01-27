export function colorDomain(data, mapping) {
  console.log('colorDomainpiechartmapping', mapping)
    const domain = mapping.arcs.value
    console.log('colorDomainpiechartmapping', domain)

    return {
      domain,
      type: 'number',
    }
  }