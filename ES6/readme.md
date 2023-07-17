# JS

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
