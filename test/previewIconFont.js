const previewIconFont = require('../api/previewIconFont');
const tempWrite = require('temp-write');
const spawn = require('cross-spawn');

let testUrl = 'https://www.xuebangsoft.net/eduboss/framework/css/bootstrap.min.css';
// let testUrl = 'F:/foreverZ133/rebuild-panda/src/themes/iconfont/index.css';
testUrl = process.argv.slice(2)[0] || testUrl;

const query = { url: testUrl };
previewIconFont({ query }, null, true).then(html => {
  // 是远程链接，还得下载相对路径的 ttf，索性先不搞
  if (/^https?/.test(query.url)) return console.log(html);

  // 本地文件，直接生成临时 HTML 文件预览
  const tempPath = tempWrite.sync(html, 'index.html');
  spawn('cmd.exe', ['/c', 'explorer.exe', tempPath]);
});
