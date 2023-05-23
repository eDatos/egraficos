export const parseObject = (data) => {
  return data instanceof Date ? data.toJSON() : data
}

export const parseObjectToValue = (data) => {
  return data instanceof Date ? data.getTime() : data
}
