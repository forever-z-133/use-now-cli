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
      <img src={props.src} alt="" />
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

export default function ReactSSR(props) {
  return (
    <>
      {props.layout.map(WidgetItem)}
    </>
  );
}
