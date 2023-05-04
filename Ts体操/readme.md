# 总结

## 注释
- JSDoc规范

## 类型命名约定
- 凡是 interface 定义的，格式都为 I + Xxxx，例如 IPerson
- 凡是 type 定义的，格式都为 Xxxx + Type，例如 PersonType

## 泛型
- 使用<> 来包裹

# 泛型约束
- 使用泛型来约束类型，有非常多不同的使用方法，例如 type PersonType<T> = T ; 约束返回值的类型必须等同于T
## keyof
- 获取 interface 定义中的属性名
## typeof
- 推导出变量或实例对象对应的type类型

## in
- 只允许在type类型内部使用，用来获取type类型的属性名

## infer
- 在extends条件推断中，推断类型的变量
