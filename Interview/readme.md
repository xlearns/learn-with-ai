# GraphQL

## 如何缓存

## N+1 问题解决方案

- 是什么
- dataLoader
  - dataLoader 为什么可以解决 graphql 的 n+1 问题的

# node 与 nest

## 说说对 Node 中的 process 的理解？有哪些常用方法？

## 说说对 Node 中的 fs 模块的理解? 有哪些常用方法

## 说说对 Node 中的 Buffer 的理解？应用场景？

## 说说对 Node 中的 Stream 的理解？应用场景？

## 说说 Node 中的 EventEmitter? 如何实现一个 EventEmitter?

## 说说对 Nodejs 中的事件循环机制理解?

# webpack

## webpack 的理解

## webpack 构建流程

## loader 与 plugin 区别

## 编写 Loader，Plugin 的思路？

## 如何借助 webpack 来优化前端性能？

## 如何提高 webpack 的构建速度？

## webpack vs vite vs rollup

## 说说 webpack proxy 工作原理？为什么能解决跨域?

# css

## 盒模型

## bfc

## 隐藏元素

# http

## 什么是强缓存

## 什么是协商缓存

# 其它

## axios 源码分析

## 说说你对 spa 的理解

- spa 其实很早之前就有了，比如 jq 时期的 backbone，不过当时由于 seo 等原因并不流行。后面随着 react、vue 的出现渐渐成为了主流
- spa 与 mpa 的区别，mpa 的每个页面都是一个主页面，都是独立的当我们在访问另一个页面的时候，都需要重新加载 html、css、js 文件。当然 mpa 不存在 seo 的问题，spa 首次渲染比较慢，spa 是局部刷新，mpa 为整页刷新。spa 路由可以是 hash / histroy，而 mpa 只能是 history。切换

## vue2 vs vue3

- 全量的 diff -> 根据 patchFlag 做 diff + 最长递增子序列
- flow -> ts
- -> monorepo 的代码管理方式（pnpm）
- Fragment 支持多个根节点
- options api -> composition api
- 自定义渲染器 createRenderer() 传入自己的渲染方法， 好处就是我可以根据 vue 核心来实现不同平台的代码
- 响应式

  - vue2
    - 1.创建 vue 实例
    - 2.对 data 定义的数据调用 observe 方法目的是将数据都变成响应式
    - 3.observe 具体逻辑为，通过 Object.prototype 对 data 进行数据劫持【数组采用了数据劫持】，再 get 收集依赖，具体来说收集的是 watcher，将 watcher 放进 dep 的数组中在代码中就是将 dep.target 的值 push 到 dep 中，dep 是一个 class 用来维护数组提供一些方法比如 notify 便利 dep 数组然后执行里面的 update 函数。在 set 中调用 dep 的 notify 方法
    - 4.watcher 是一个 class 具体是将实例 this 赋值给 dep.target。而这个 this 其实就是 vue 组件也就是虚拟 dom
    - 5.模板编译：通过词法分析生产一个一个 tokens。然后通过语法解析将 tokens 生产 ast，优化 ast 将静态节点打上 tag，便于后面 diff 的时候直接忽略，然后生成 render 函数。也就是 this 也就是每一个组件的 render 函数会放到 dep 中
    - 6.调用 render 函数【比如出发 set】，生成虚拟 dom，如果没有旧节点就直接跳过 diff 直接调用 dom 的 api 渲染到页面上，如果有旧 diff 则找到差异，然后将差异渲染到实际的 dom 上
  - vue3

    - 宏观来说，vue3 响应式主要是通过 proxy 进行数据劫持，如果读取数据则将副作用函数从桶中取出，设置则往桶里放。通过 weakmap+map 构建了桶结构
    - 一些 case

      - 分支切换问题
      - 设置代理对象不存在的属性的时候不应该触发 effect
      - 调用多个 effect
      - effect 嵌套
      - new Set 循环

    - 最外层有个 activeEffect 对象标识当前的 effect，还有个 weakMap 对象 主要是用于存储响应式对象的依赖关系，大概格式为里面包裹着 Map。Map 里面包括则 set，而 set 里面装着 activeEffect
      - 为什么要这么设计呢
        - 如果只是一个简单的 set 类型，当向代理对象添加不存在的对象时候，也会触发 effect。而不是根据 effect 里面依赖谁所以将数据结构改成了下面这样
        - 当访问一个代理对象的时候，会存在 3 部分
          - weakmap->map->set
          - 被操作【读取】的代理对象
          - 被操作【读取】的字段名
          - 副作用函数 effect

    ```
     weakmap{
      map{
        set[effect,effct]
      }
     }

    ```

    - reactive
      - ES6 Proxy 来拦截对响应对象的访问和修改操作
      - get 收集依赖核心逻辑为 track
      - set 触发依赖核心逻辑为 trigger
    - track
    - trigger
    - effect
    - run
      - 核心逻辑
    - stop

    ```js
    const stack = new WeakMap();
    let activeEffect;
    const data = { text: "123" };
    const obj = new Proxy(data, {
      get(target, key) {
        track(target, key);
        return target[key];
      },
      set(target, key, newVal) {
        target[key] = newVal;
        trigger(target, key);
      },
    });
    function track(target, key) {
      let depMap = stack.get(target);
      if (!depMap) {
        stack.set(target, (depMap = new Map()));
      }
      let deps = depMap.get(key);
      if (!deps) {
        depMap.set(key, (deps = new Set()));
      }
      deps.add(activeEffect);
    }
    function trigger(target, key) {
      const depMap = stack.get(target);
      if (!depMap) return;
      const effects = depMap.get(key);
      effects && effects.forEach((fn) => fn());
    }
    function effect(fn) {
      activeEffect = fn;
      fn();
    }
    effect(() => {
      console.log("effet render");
      document.body.innerHTML = obj.text;
    });
    setTimeout(() => {
      console.log(1);
      obj.text = "hellow world";
    }, 1000);
    ```

## vue vs react

- 架构层面
- 生态
  - vue 比较统一
  - react 的选择
- 使用体验
- 底层原理
  - diff
  - 双向数据绑定
  - 单向数据流
- 个人体验

## typeof 与 instanceof 区别

## == 与 === 区别

- "==" 运算符是相等算符，用比较两个值是否相等。它会进行类型转换，然后再较值。如果两个值的类型不同它会尝试将它们转换为相同类型，然后再进行比较使用"===" 运算符可以更确地比较两个值是否相等，而不会受到类型转换的影响

## 类型转换机制

## this 的理解

## js 事件模型

## new 原理

## bind call apply 原理

## ajax/fetch/axios 原理

- 如何取消发送的请求

## 内存泄漏的场景

## 本地存储

## event loop

## fp 的优缺点，与 oop 有何区别

## 函数缓存

- lodash memoize 函数

## 防抖节流

## 如何判断一个元素是否再可视化区

## 大文件上传如何做断点续传

## 什么是单点登录

## 平时的工作中你有做过什么性能优化

- 首先性能优化不同的项目优化的手段是不一样的，不过所有优化手段无碍乎 2 点：
  - 减少包体积【b/s 架构】
  - 能缓存的地方缓存
- 具体方案
  - 减少包体积
    - 精灵图
    - 代码分割
  - 缓存
    - 接口缓存
    - 计算结构缓存
    - 不可变数据持久化
  - 框架
    - tree sharing
    - ssr
    - 异步组件

# JS

## 什么是闭包

- 为什么会产生闭包【背景】：JavaScript 的函数是一等公民，可以作为参数传递，也可以作为返回值。这就导致了一个问题，当一个函数在其定义环境之外被调用时，如何访问其原始环境的变量？这就是闭包出现的背景。闭包的出现，解决了函数与其定义环境的变量之间的关联问题。
- 是什么：
  - 关于闭包社区对此众说纷纭，MDN 给出的定义是：`闭包是指那些能够访问自由变量的函数。` 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的外部变量【不能是全局对象，因为全局对象不满足外部变量的条件，其再内部就可以访问】。
- 特性：
  - 函数嵌套：闭包是由函数和与其相关的引用环境组合而成的实体。JavaScript 中的闭包存在于嵌套的内部函数中。
  - 访问外部变量：闭包可以访问和操作其外部函数的变量。
  - 保存状态：闭包可以用来保存状态，即使外部函数已经退出，闭包仍然可以访问和修改这些变量。
  - 内存消耗：虽然闭包有很多优点，但是由于闭包会使得函数中的变量都保存在内存中，过度使用闭包可能会导致内存消耗过大。
- 用途
  - 模拟私有方法：JavaScript 本身不支持私有方法，但是我们可以使用闭包来模拟私有方法。
  - 创建特权方法：可以使用闭包来创建能够访问私有变量的公有方法，这些公有方法被称为特权方法。
  - 实现数据隐藏和封装：闭包可以帮助我们隐藏不应该被直接访问的数据，实现封装。
  - 实现函数柯里化：闭包可以用来实现函数柯里化，即创建已经设置了一个或多个参数的函数。
  - 创建块级作用域：在 ES6 之前，JavaScript 没有块级作用域，但我们可以使用闭包来模拟块级作用域。

## 什么是原型

- 概念
  - 构造函数的每个实例都有一个 `__proto__ `指针，它指向构造函数的 prototype 对象。prototype 对象包含了通过该构造函数创建的实例所共享的属性和方法
- 用途
  - 继承：通过原型链，对象可以继承其原型对象的属性和方法。这使得代码可以更好地组织和重用，避免了重复编写相似的代码。
  - 属性和方法的共享：原型对象中的属性和方法可以被所有基于该原型创建的对象共享。这意味着可以在一个地方定义属性和方法，然后所有相关的对象都可以访问和使用它们。
  - 动态性：原型链是动态的，可以在运行时动态地修改和扩展对象的原型，从而影响到所有基于该原型创建的对象。这种动态性使得 JavaScript 具有很高的灵活性和可扩展性。

## 什么是原理链

- 对比 java 原型链的区别：
  - 与 java 这种类继承机制不同：
    - js 的原型链非常灵活，它运行对象可以再运行时动态 crud 属性方法
    - 可以通过原型链共享方法和属性。当多个对象共享相同的原型时，它们可以共享相同的方法和属性，从而节省内存空间
    - 原型链允许对象在运行时继承其他对象的属性和方法。这意味着对象可以在不预先定义类的情况下进行继承，从而提供更大的灵活性
- 作用：它使得对象之间可以共享属性和方法，提高了代码的复用性
- 当查找一个对象的属性或者方法的时候，首先会从自身开始查找，如果在当前对象的原型上找不到所需的属性或方法，就会继续在原型的原型上进行查找，直到最终在原型链的顶端（Object 的 prototype 为 null）找到或者遍历完整个原型链。这样的查找过程被称为原型链。

## 继承有哪些，每一种的优缺点

- class
- 原型链
- 组合
- 组合寄生
- 构造函数

## 说说 JavaScript 中的数据类型？存储上的差别？

# ES6

## ES6 中数组新增了哪些扩展

- `Polyfill 的话可以参考 core-js`
- Array.from

  - feature
    - 返回一个新数组
    - 类数组 to 数组
    - 接受一个映射函数作为第二个参数，用于对每个元素进行转换或操作
  - Polyfill

  ```js
  //类数组->数组
  /**
   * [].slice.call与Array.from的缺点：
   * 不适用于所有类数组对象。只适用于具体的数字索引和length属性的类数组对象，如果属性名不是连续的数字则无法转换为数字哪一项为null。如果没有length属性则直接返回空数组
   * [].slice.call无法进行元素映射操作
   */
  function Array(object) {
    return [].slice.call(object);
  }

  //core-js源码
  function Array() {}
  ```

- Array.of

  - Polyfill

  ```js

  ```

- find、findIndex

  - Polyfill

  ```js

  ```

- includes

  - Polyfill

  ```js
  /*
   *
   *indexof polyfill
   */
  Array.prototype.indexOf = function (searchElement) {
    var fromIndex = arguments.length > 1 ? arguments[1] : 0;
    var arr = this;
    var len = arr.length;
    var index =
      fromIndex < 0 ? Math.max(len + fromIndex, 0) : Math.min(fromIndex, len);
    var result;
    for (; len > index; index++) {
      if (arr[index] == searchElement) {
        return index;
      } else {
        return -1;
      }
    }
  };

  Array.prototype.includes = function (target, fromIndex) {
    var arr = this;
    var len = arr.length;
    var index =
      fromIndex < 0 ? Math.max(len + fromIndex, 0) : Math.min(fromIndex, len);
    while (len > index) {
      var value = arr[index++];
      if (value == target) {
        return true;
      }
    }
    return false;
  };
  ```

- flat、flatMap

  - Polyfill

  ```js

  ```

- map

  - Polyfill

  ```js
  Array.prototype.map = function (callbackfn, that) {
    var self = this;
    var boundFunction = callbackfn.bind(that || window);
    var length = self.length;
    var index = 0;
    var result, value;
    var target = [];
    for (; length > index; index++) {
      value = self[index];
      result = boundFunction(value, index, self);
      target[index] = result;
    }
    return target;
  };
  ```

- Array.forEach

  - Polyfill

  ```js

  ```

- filter

  - Polyfill

  ```js
  Array.prototype.filter = function (callbackfn, that) {
    var self = this;
    var boundFunction = callbackfn.bind(that || window);
    var length = self.length;
    var index = 0;
    var result, value;
    var target = [];
    for (; length > index; index++) {
      value = self[index];
      if (boundFunction(value, index, self)) {
        target.push(value);
      }
    }
    return target;
  };
  ```

- some

  - Polyfill

  ```js
  Array.prototype.some = function (callbackfn, that) {
    var self = this;
    var boundFunction = callbackfn.bind(that || window);
    var length = self.length;
    var index = 0;
    var result, value;
    for (; length > index; index++) {
      value = self[index];
      if (boundFunction(value, index, self)) {
        return true;
      }
    }
    return false;
  };
  ```

- every

  - Polyfill

  ```js
  Array.prototype.every = function (callbackfn, that) {
    var self = this;
    var boundFunction = callbackfn.bind(that || window);
    var length = self.length;
    var index = 0;
    var result, value;
    for (; length > index; index++) {
      value = self[index];
      if (!boundFunction(value, index, self)) {
        return false;
      }
    }
    return true;
  };
  ```

- reduce

  - Polyfill

  ```js
  Array.prototype.reduce = function (callbackfn, that) {
    var self = this;
    var boundFunction = callbackfn.bind(that || window);
    var length = self.length;
    var index = 0;
    var result, value;
    var target = [];
    for (; length > index; index++) {
      value = self[index];
      if (boundFunction(value, index, self)) {
        target.push(value);
      }
    }
    return target;
  };
  ```

- for of

  - Polyfill

  ```js

  ```

- 数组解构赋值

## ES6 对象新增了哪些扩展

## ES6 函数新增了哪些扩展？

## 你是怎么理解 ES6 新增 Set、Map 两种数据结构的

## 你是怎么理解 ES6 中 Promise 的？使用场景？

## 你是怎么理解 ES6 中 Generator 的？使用场景？

## 你是怎么理解 ES6 中 Proxy 的？使用场景？

## 你是怎么理解 ES6 中 Module 的？使用场景？

## 你是怎么理解 ES6 中 Decorator 的？使用场景？

## var、let、const 区别

- 背景
  - let、const 主要是为了解决 var 没有块级作用域、可以重复声明、变量提升导致一些奇怪的现象【变量可以在声明之前使用造成意想不到的结果】、不允许常量声明等问题，让 js 更加严谨
- 区别
  - 变量提升：
    - 根据红宝书上面所述：js 分为编译阶段以及运行阶段。首先无论是 var 还是 let、const 都具有变量提升，只不过提升的行为不同，具体来说 var 的变量提升不光是提升到了最上面而且还会初始化为 undefined，而 let 只会提升，而没有初始化的初始化，所以这就会导致当在声明之前调用 let 声明的变量的时候会报 TDZ【不能在初始化调用】错误。const 同理
  - 块级作用域：
    - let、const 是具备块级作用域的，在 es6 之前也就是 ecmascript262 是没有块级作用域的概念的，想要实现块级作用域只能通过 IIFE[子自行函数]、try-catch、with
  - 常量：
    - const 声明的常量是不可以被修改的，但是当声明的常量是一个对象，则对象地址是不可以修改的但是对象内容是被修改的。

## babel 原理

- 其实不管是 babel 还是 vue 的 template 亦或是 react 的 jsx 或者 js 执行代码，其编译部分都是进行如下步骤
- 1.会进行词法分析，然后根据词法分析生产 TOKENS 生产 AST
- 2.对生成的 ast 进行 transform【优化/转换】
- 3.生产代码
- 如果是 babel 的话再生产 ast 之后会调用 corejs 将 es6 全部转换成 es5

## js 执行一段代码都发生了什么

- 根据小黄书【你不懂的 js】所述具体步骤如下

  - 词法分析：
    - 引擎首先对代码进行词法分析，将代码分解为一个个标记【Tokens】，如关键字、标识符、运算符等。
  - 语法分析
    - 引擎使用词法分析得到的标记构建抽象语法树，通过语法分析器解析代码的结构和语法规则
  - 创建词法环境
    - 在执行代码之前，引擎会创建一个全局环境作为顶层环境，并将其与当前执行上下文相关联。
  - 变量提升
    - 在进入执行阶段之前，引擎会扫描代码，将变量声明和函数声明【具体来说有 var、let、const 函数声明】提升到当前作用域的顶部。
  - 执行代码
    - 引擎按照语句的顺序逐行执行代码。执行过程中，引擎会根据作用域链和词法环境来解析标识符【RHS 、LHS】，并执行相应的操作。
  - 垃圾回收
    - 在代码执行完成后，引擎会对不再使用的变量和对象进行垃圾回收，释放内存空间。

## 错误拦截

- 错误类型
  - 跨域错误
  - js 语法错误
  - js Promise 错误
  - 资源加载错误
  - 接口请求错误 / 网络错误
- 针对不同错误的拦截办法

  - try-catch

    - try-catch 只能捕获同步代码中的错误，无法捕获异步操作（如定时器、事件处理程序、Promise）中的错误
    - 不能捕获跨域错误
    - try-catch 也可以捕获异步任务【不过要变成同步【await、async】、或者写道为异步里面`setTimeout(()=>{try{}catch(e){}})`】

    ```js
    try {
      Promise.reject("xx");
    } catch (e) {
      console.log(1);
    } //拦截不到

    try {
      setTimeout(() => {
        try {
          Promise.reject("xx");
        } catch (e) {} // 可以拦截到
      });
    } catch (e) {
      console.log(1);
    } //拦截不到

    async function fn() {
      try {
        await new Promise((resolve, reject) => {
          reject();
        });
      } catch (e) {
        //可以拦截到
      }
    }
    fn();
    window.addEventListener("unhandledrejection", function (event) {
      console.log(11, event);
    }); //可以拦截到promise reject 没有catch的错误
    ```

  - window.error
    - 全局事件处理函数，用于捕获未被 try-catch 捕获的 JavaScript 运行时错误。它可以用来拦截 js 语法错误和一些运行时错误，并提供错误信息、错误所在文件和行号等相关信息。无法捕获异步代码中的错误。
  - addEventListener('error',()=>{})
    - 可以捕获资源加载错误，例如图片加载失败、脚本加载失败等。可以在事件处理函数中进行错误处理或记录错误信息。
  - addEventListener('unhandledrejection')
    - 可以捕获未被处理的 Promise 错误。当 Promise 被拒绝且没有被 catch 处理时，会触发该事件，可以在事件处理函数中进行错误处理或记录错误信息。
  - 框架【vue/react】
    - 有自己的错误采集接口

# 项目

## 让你从 0 设计一个 脚手架需要考虑什么

- 背景【确定痛点】

## 让你从 0 设计一个 Bff 平台需要考虑什么

- 背景【确定痛点】

## 让你从 0 设计一个组件库需要考虑什么

- 背景【确定痛点】

## 让你从 0 设计一个 devops 平台需要考虑什么

- 背景【确定痛点】

## 让你从 0 设计一个 lowcode 平台需要考虑什么

- 背景【确定痛点】

## 让你从 0 设计一个异常监控系统需要考虑什么

- 背景【确定痛点】
- 调研一些社区上不错的方案
- 参考 Sentry
- 一个异常监控系统分为错误拦截以及上报错误
  - 上报
    - 自动收集【无感收集】
    - 手动上报
  - 拦截

## 基于 gpt 的 api 写了 xx
