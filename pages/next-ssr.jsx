import Image from 'next/image';

function TextWidget(props) {
  return (
    <div style={props.css}>
      <p>{props.content}</p>
    </div>
  );
}
function ImageWidget(props) {
  return (
    <div style={props.css}>
      <Image src={props.src} alt="" width={200} height={150} />
    </div>
  );
}
const widgetConfig = { 'text': TextWidget, 'image': ImageWidget };

function WidgetItem(item) {
  const { id, type } = item;
  const Widget = widgetConfig[type];
  if (!Widget) return null;
  return <Widget key={id} {...item} />
}

export default function NextSSR(props) {
  return (
    <>
      {props.layout.map(WidgetItem)}
    </>
  );
}

const sleep = (time = 1e3) => new Promise(resolve => setTimeout(resolve, time));

export async function getStaticProps(context) {
  await sleep(1e3);
  const layout = [
    { id: 1, type: 'text', content: 'test', css: { color: 'red' } },
    { id: 2, type: 'image', src: 'https://forever-z.oss-cn-shenzhen.aliyuncs.com/favicon.png', css: { width: '200px', height: '150px' } }
  ];
  return { props: { layout } };
}
