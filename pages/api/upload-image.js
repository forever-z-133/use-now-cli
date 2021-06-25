const { getQuery } = require('./utils/index.js');
const { uploadFile } = require('../../utils/ali-oss.js');

module.exports = async (req, res) => {
  const file = getQuery('file', req);

  const result = await uploadFile(undefined, file);

  res.json(result);
};
