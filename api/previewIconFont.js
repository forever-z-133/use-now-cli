const previewIconFont = require('../module/previewIconFont/index');

module.exports = (req, res) => {
  const {
    query: {
      url
    }
  } = req;

  var html = previewIconFont(url);

  res.send(html);
}