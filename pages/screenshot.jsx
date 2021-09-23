import { useState } from "react";
import axios from 'axios';
import Image from 'next/image';

const url_reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;

export default function Screenshot() {
  const [value, setValue] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    const val = e.target.value;
    setValue(val);
  }

  const onClick = () => {
    if (!url_reg.test(value)) return alert('链接格式不正确');
    setLoading(true);
    const params = { url: value };
    axios.get('/api/screenshot', { params })
      .then(res => res.data)
      .then(text => `data:image/jpg;base64,${text}`)
      .then(url => setUrl(url))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <input value={value} onChange={onChange} placeholder="https://www.example.com" />
      <button onClick={onClick}>截图</button>
      {loading && '截图中...'}
      {url && <Image src={url} alt="测试图" width={200} height={150} />}
    </>
  );
}
