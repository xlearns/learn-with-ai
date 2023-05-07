type p = Promise<"guang">;

type test1pType = Awaited<p>;

// 通过 infer 声明一个局部变量 T 来保存，如果匹配，就返回匹配到的 T，否则就返回 never 代表没匹配到
type test2pType = p extends Promise<infer T> ? T : never;

type arr = [1, 2, 3];

type FirstType<T extends unknown[]> = T extends [infer one, ...unknown[]]
  ? one
  : never;
type LastType<T extends unknown[]> = T extends [...unknown[], infer last]
  ? last
  : never;

type PopType<T extends unknown[]> = T extends [unknown, ...infer Rest]
  ? Rest
  : never;

type ShiftType<T extends unknown[]> = T extends [...infer Rest, unknown]
  ? Rest
  : never;

type firstTest1Type = FirstType<arr>;
type lastTest1Type = LastType<arr>;

type popTest1Type = PopType<arr>;
type shiftTest1Type = ShiftType<arr>;

type GetParameters<T extends Function> = T extends (
  ...args: infer rest
) => unknown
  ? rest
  : never;

type ParametersResult = GetParameters<(name: string, age: number) => string>;

// type GetRefProps<T extends { ref?: unknown }> = T["ref"];

// type GetRefProps<T extends object> = T extends { ref?: infer Ref; name: string }
//   ? Ref
//   : never;

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer T }
    ? T
    : never
  : never;

type GetRefPropsRes = GetRefProps<{ ref?: 1; name: "dong" }>;

type GetRefPropsRes2 = GetRefProps<{ ref?: undefined; name: "dong" }>;

type a = { name: "sdad"; ref: "" } extends { ref?: unknown } ? true : false;
