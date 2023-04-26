export function parseObject(data) {
  return data instanceof Date ? data.toJSON() : data
}

export function parseObjectToValue(data) {
  return data instanceof Date ? data.getTime() : data
}
