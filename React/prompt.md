## react开发环境下为什么console会输出两次
- 在React开发环境下，如果您在组件中使用了console.log进行调试，则可能会注意到每个日志消息都出现了两次。这是因为React在开发模式下会对组件进行两次渲染：第一次渲染会生成虚拟DOM并进行差异比较，然后第二次渲染会应用实际更改。


## 为什么说useCallback需要配合 memo,否则不但不会提升性能，还有可能降低性能
- 单独使用 useCallback 只会缓存一个函数的引用，而不会对组件的重渲染产生影响；而单独使用 memo 只会在组件的 props 发生变化时才会触发重新渲染，但是并不会减少子组件中函数的重新生成。因此，只有将 useCallback 和 memo 配合使用才能真正优化组件的性能。



## 避免无意义渲染
- 起因
  - 在React中，当组件的props或state改变时，它们会被重新渲染。这意味着每次重新渲染时，函数组件内部的所有函数都将被重新创建
### useCallback
- useCallback并不总是意味着更好的性能。当我们缓存一个函数实例时，它会占用一些内存，而且在某些情况下，这可能会导致内存泄漏问题。因此，在使用useCallback前，我们应该慎重考虑是否真正需要它，并确保正确地管理组件的状态和生命周期。

### React.memo
- 是一个高阶组件，用于优化函数组件的性能。它可以帮助我们避免在props没有改变的情况下重新渲染组件

### useMemo
#### 请提供一个react的useMemo最小实现demo要能体现useMemo的特点
```js
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
```