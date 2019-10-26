const previewIconFont = require('../module/previewIconFont/index.js');

module.exports = async (req, res, isTest) => {
  const {
    query: {
      url
    }
  } = req;

  var html = await previewIconFont(url);

  if (isTest) return html;
  res.send(html);
}