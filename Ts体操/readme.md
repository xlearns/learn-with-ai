# 总结

## 注释

- JSDoc 规范

## TypeScript 类型编程为什么被叫做类型体操

- TypeScript 给 JavaScript 增加了一套静态类型系统，通过 TS Compiler 编译为 JS，编译的过程做类型检查。
- JS 本身足够灵活，要准确定义类型那类型系统必然也要设计的足够灵活,这就导致很多类型编程的逻辑写起来比较复杂，因此被戏称为类型体操

## 类型命名约定

- 凡是 interface 定义的，格式都为 I + Xxxx，例如 IPerson
- 凡是 type 定义的，格式都为 Xxxx + Type，例如 PersonType

## Tuple

- 元组（Tuple）就是元素个数和类型固定的数组类型

## Interface

- 接口（Interface）可以描述函数、对象、构造器的结构

## Union

- 联合类型（Union）类似 js 里的或运算符 |，但是作用于类型，代表类型可以是几个类型之一

## in

- `in `是用于遍历联合类型的运算符

## Intersection

- 交叉类型（Intersection）类似 js 中的与运算符 &，但是作用于类型，代表对类型做合并
- 同一类型可以合并，不同的类型没法合并，会被舍弃

## Index Type

- 映射类型
  - 映射类型就相当于把一个集合映射到另一个集合
  - 对象、class 在 TypeScript 对应的类型是索引类型（Index Type）
- 除了值可以变化，索引也可以做变化，用 as 运算符，叫做重映射

## 泛型

- 类型参数
- 使用<> 来包裹

## 高级类型

- 传入类型参数，经过一系列类型运算逻辑后，返回新的类型的类型

# 泛型约束

- 使用泛型来约束类型，有非常多不同的使用方法，例如 type PersonType<T> = T ; 约束返回值的类型必须等同于 T

## keyof

- 获取 interface 定义中的属性名

## typeof

- 推导出变量或实例对象对应的 type 类型

## in

- 只允许在 type 类型内部使用，用来获取 type 类型的属性名

## any 和 unknown 的区别

- any 和 unknown 都代表任意类型，但是 unknown 只能接收任意类型的值，而 any 除了可以接收任意类型的值，也可以赋值给任意类型（除了 never）。类型体操中经常用 unknown 接受和匹配任何类型，而很少把任何类型赋值给某个类型变量

## extends 判断问题

- `A extends B` 表示看看前者[A]是否可以被视为后者[B]的子类型

```ts
type a = { name: "sdad"; ref: "" } extends { ref?: unknown } ? true : false; // true
type ab = { name: "sdad" } extends { ref?: unknown } ? true : false; // false
```

- 当你写 type a = {name:'sdad',ref:''} extends {ref?:unknown} ? true:false 时，它的意思是将类型 { name: 'sdad', ref: '' } 和类型 { ref?: unknown } 进行比较，看看前者是否可以被视为后者的子类型。如果能够被视为子类型，返回值为 true，否则返回值为 false。由于类型 {name: 'sdad', ref: ''} 中包含了一个空字符串类型的 ref 属性，而父类型 { ref?: unknown } 中只有一个可选的 ref 属性，因此子类型中的 ref 属性可以被赋值为任何类型，满足父类型定义的要求。同时，子类型也包含了一个必需的 name 属性，这是父类型所没有的。因此，在 TypeScript 中，{name:'sdad',ref:''} 可以被认为是 { ref?: unknown } 的子类型，继承关系存在，返回值为 true。而当你写 type ab = {name:'sdad'} extends {ref?:unknown} ? true:false 时，它的意思是将类型 { name: 'sdad' } 和类型 { ref?: unknown } 进行比较，看看前者是否可以被视为后者的子类型。由于类型 {name: 'sdad'} 中没有 ref 属性，而父类型 { ref?: unknown } 中包含了一个可选的 ref 属性，因此子类型中缺少了父类型的一个可选属性，不满足父类型定义的要求，继承关系不存在，返回值为 false。总之，当子类型包含了父类型所有属性，并保持相同或更宽松的属性类型（如从必需变为可选），就可以被认为是父类型的子类型。反之，当子类型中缺少了任何一个父类型的属性，就不能被认为是父类型的子类型。

## 技巧

### 模式匹配

- Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。

### 重新构造做变换

- TypeScript 的 type、infer、类型参数声明的变量都不能修改，想对类型做各种变换产生新的类型就需要重新构造
