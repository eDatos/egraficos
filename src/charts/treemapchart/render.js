export function colorDomain(data, mapping) {
  let domain = '';
  if (data && mapping.hierarchy?.value && mapping.hierarchy.value?.length > 0) {
    domain = [];
    data.forEach((element) => {
      let value = element[mapping.hierarchy.value[0]];
      if (domain.indexOf(value) === -1) {
        domain.push(value);
      }
    });
  }
  return {
    domain,
    type: 'string',
  };
}
