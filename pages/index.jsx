import Link from 'next/link';

export default function Home() {
  return (
    <div className="home">
      <ul>
        <li><Link href="/preview-iconfont">预览 CSS 文件中的字体图标</Link></li>
        <li><Link href="/screenshot">用 puppeteer 截图</Link></li>
        <li><Link href="/next-ssr">服务端渲染，用 nextjs</Link></li>
        <li><Link href="/api/react-ssr">服务端渲染，用 api</Link></li>
      </ul>
    </div>
  );
}
