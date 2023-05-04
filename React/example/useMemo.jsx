import React, { useState, useMemo } from "react";
const Demo = () => {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(true);
  const result = useMemo(() => {
    console.log("Calculating result...");
    return count * 2;
  }, [count]);
  console.log("rendered again");
  return (
    <div>
      <h1>Result: {result}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setShow(!show)}>{show ? "显示" : "隐藏"}</button>
    </div>
  );
};
export default Demo;
