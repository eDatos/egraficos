export function colorDomain(data, mapping) {
  let domain = '';
  if (data && mapping.series?.value?.length > 0) {
    domain = data
      .flatMap((item) =>
        item[mapping.arcs.value] > 0 ? item[mapping.series.value] : []
      )
      .filter((value, index, self) => self.indexOf(value) === index);
  } else {
    domain = mapping.arcs.value;
  }
  return {
    domain,
    type: 'number',
  };
}
