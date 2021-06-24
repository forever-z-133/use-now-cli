import { useState } from "react";

export default function PreviewIconFont() {
  const [result, setResult] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const input = document.querySelector('#url');
    const url = input.value;
    if (!/https?:\/\//.test(url)) return alert('Invalid URL');
    setResult('loading...');
    fetch(`/api/previewIconFont?url=${url}`)
      .then(response => response.text())
      .then(html => {
        if (!html) setResult('该 CSS 文件中未找到字体图标');
        setResult(html);
      });
  }

  return (
    <div className="home">
      <form id="form" onSubmit={onSubmit}>
        请输入一个 css 文件的链接：
        <input id="url" type="url" placeholder="http://" defaultValue="https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css" />
        <button type="submit">提交</button>
        <p style={{ color: "#999" }}>例如：https://cdn.bootcss.com/twitter-bootstrap/3.4.1/css/bootstrap.min.css</p>
      </form>
      <div id="result" dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  )
}
