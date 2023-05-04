import React, { useState, useEffect, useRef } from "react";
function App() {
  const [data, setData] = useState([]);
  const cachedData = useRef([]);
  useEffect(() => {
    // 从 API 获取数据
    const data = Array.from({ length: 5 }).map((item, index) => ({
      name: index
    }));

    setData(data);
    cachedData.current = data;
  }, []);

  const handleClick = () => {
    // 从缓存中读取数据
    console.log(cachedData.current);
  };
  return (
    <div>
      <button onClick={handleClick}>Load Cached Data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
