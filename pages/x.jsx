import { useState } from "react";

export default function Test() {
  const [num, setNum] = useState(0);

  return (
    <div className="test">
      <button onClick={() => setNum(num + 1)}>{num}</button>
    </div>
  )
}
