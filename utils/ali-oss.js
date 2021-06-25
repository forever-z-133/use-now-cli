const OSS = require('ali-oss');
const path = require('path');

export const client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI4Fzy9ciWQvb4uyE1h8Fk',
  accessKeySecret: 'Y6PUsaUQCvbNTrovK8nmJp8fMXcRJc',
  bucket: 'forever-z'
});

const targetPath = path.resolve('images/');

export const uploadFile = async (fileName, file) => {
  fileName = fileName|| Math.random().toString(16).slice(2);
  const result = await client.put('images/' + fileName, file, { headers: { 'Content-Disposition': 'inline' }, mime: 'image/jpeg' });
  return result;
}
