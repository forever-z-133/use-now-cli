
export const getQuery = (key, req) => {
  if (req.body && req.body[key]) {
    return req.body[key]
  } else if (req.query[key]) {
    return req.query[key]
  } else if (req.cookies[key]) {
    return req.cookies[key]
  }
}
