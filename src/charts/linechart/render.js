export function colorDomain(data, mapping) {
  console.log('colorDomainlinechartmapping', mapping)
  console.log('colorDomainlinechartdata', data)

    const domain = data.map(res =>res.lines).filter((value, index, self) => self.indexOf(value) === index).sort();
    console.log('colorDomainlinechart', domain)
    return {
      domain,
      type: 'number',
    }
  }