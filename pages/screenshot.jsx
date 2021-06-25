import { useState } from "react";
import Image from 'next/image';

export default function Screenshot() {
  const [url, setUrl] = useState('');

  const onClick = () => {
    fetch('/api/screenshot')
      .then(response => response.json())
      .then(json => json?.url)
      .then(url => setUrl(url));
  };

  return (
    <>
      <button onClick={onClick}>截图</button>
      {url && <Image src={url} alt="测试图" width={200} height={150} />}
    </>
  );
}
