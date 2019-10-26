const fs = require('fs');

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

async function previewIconFont(input) {
  const cssStr = await readFile(input);
  const cssObj = cssStrToCssObject(cssStr);
  
  const fonts = [];  // 带有字体名称的集合
  const conts = [];  // 带有 font-family 的集合
  const icons = [];  // 带有 :before{ content: '\000f' } 的集合
  forEachDeep(cssObj, 'child', (item) => {
    if (item.key.indexOf('@font-face') > -1) {
      fonts.push(item);
    } else if (item.attrs && (item.attrs.font || item.attrs['font-family'])) {
      conts.push(item);
    }
    if (item.key.includes(':before') || item.key.includes(':after')) {
      const { content } = item.attrs || {};
      if (/\\[0-9a-f]{4}/i.test(content)) {
        icons.push(item);
      }
    }
  });

  const iconfont = [];  // 含有字体名称的类名，比如 .glyphicon
  conts.forEach(item => {
    const fontFamily = item.attrs && (item.attrs.font || item.attrs['font-family']);
    var inner = fonts.some(font => {
      const fontFamily2 = font.attrs && font.attrs['font-family'];
      return fontFamily.includes(fontFamily2);
    })
    if (inner) {
      iconfont.push(item);
    }
  });

  const result = iconfont.reduce((re, item) => {
    const fontFamily = (item.key.match(/(?<=\.).+?(?=\b)/) || [])[0];
    re[fontFamily] = icons.reduce((res, icon) => {
      return icon.key.includes(item.key) ? res.concat([icon]) : res;
    }, []);
    return re;
  }, {});  // 获得 { 'Glyphicons Halflings': [] } 的结果

  const newHtml = renderHtml(result, input);
  return newHtml;
}

function readFile(url, callback) {
  return new Promise((resolve) => {
    const isHttps = /^https/.test(url);
    const isHttp = /^http/.test(url);
    if (isHttps || isHttp) {
      ajax = isHttps ? require('https') : require('http');
      ajax.get(url, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          const result = body.toString();
          callback && callback(result);
          resolve(result);
        });
      });
    } else {
      const result = fs.readFileSync(url);
      callback && callback(result);
      resolve(result);
    }
  });
}

// 渲染 html 模板并生成新 html
function renderHtml(result, input) {
  let html = `
    <link rel="stylesheet" href="{{cssPath}}">
    <div>{{iconsTemplate}}</div>
  `;
  html = html.replace('{{cssPath}}', input);
  html = html.replace('{{iconsTemplate}}', function() {
    let _html = '';
    for (let fontFamily in result) {
      const list = result[fontFamily];
      _html += `<h1>${fontFamily}</h1>`;
      _html += '<div style="display: flex;">' + list.reduce((re, item) => {
        const className = (item.key.match(/(?<=\.).+?(?=\:)/) || [])[0];
        if (!className) return re;
        return re + `<div><span class="${fontFamily} ${className}"></span><b>${className}</b></div>`;
      }, '') + '</div>';
    }
    return _html;
  });
  return html;
}

// css 字符串转 json 格式
function cssStrToCssObject(cssStr) {
	cssStr = cssStr.replace(/\s*[\t\n]\s*/g, ''); // 去掉换行
  cssStr = cssStr.replace(/\/\*.*?\*\//g, ''); // 去除注释
  
  const reg = /(?<=^|}|{)\s*([^}{]*?)\s*{(([^}]*?{.*?})|([a-z\-]*?:.*?(?=;|}))*)}/g;
  const cssObj = (function loop(str, res) {
    str.replace(reg, (match, key, attrs, child) => {
      if (child) { // @media{.b{x:1}} 形态的
        child = loop(child, []);
        attrs = void 0;
      } else if (attrs) { // .a{x:1} 形态的
        attrs = stringToObject(attrs, /\s*;\s*/, /\s*:\s*/);
      }
      res.push({ key, attrs, child });
    });
    return res;
  })(cssStr, []);

  return cssObj;
}

// 深度遍历
function forEachDeep(obj, childKey, callback) {
  for (let key in obj) {
    const item = obj[key];
    if (key === childKey && item) {
      if (Array.isArray(item) || typeOf(child) === 'object') {
        forEachDeep(item, childKey, callback);
      }
    } else {
      callback && callback(item, key, obj);
    }
  }
}

// a=1&b=2 转为 {a:1,b:2}
function stringToObject(str, divide, concat) {
  if (!str || typeof str !== 'string') return {};
  divide = divide || '&';
  concat = concat || '=';
  var arr = str.split(divide);
  return arr.reduce(function (re, item) {
    if (!item) return re;
    var temp = item.split(concat);
    var key = temp.shift().trim();
    var value = temp.join(concat).trim();
    if (!key) return re;
    if (['null', 'undefined'].indexOf(value) > -1) value = undefined;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    re[key] = value;
    return re;
  }, {});
}