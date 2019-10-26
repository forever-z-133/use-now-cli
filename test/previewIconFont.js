const previewIconFont = require('../api/previewIconFont');

const query = { url: 'https://www.xuebangsoft.net/eduboss/framework/css/bootstrap.min.css' };
previewIconFont({ query }, null, true).then(html => {
  console.log(html);
});