import { renderToString } from 'react-dom/server';
import ReactSSR from '../../components/react-ssr.jsx';

module.exports = async (req, res) => {
  const layout = [
    { id: 1, type: 'text', content: 'test', css: { color: 'red' } },
    { id: 2, type: 'image', src: 'https://forever-z.oss-cn-shenzhen.aliyuncs.com/favicon.png', css: { width: '200px', height: '150px' } }
  ];

  const html = renderToString(<ReactSSR layout={layout} />);

  res.send(html);
};
