interface ITodo {
	title: string;
	description: string;
	completed: boolean;
	test: string;
	age: number;
}

type UnionType = "a" | "b" | "c";

interface CatInfo {
	age: number;
	breed: string;
}

declare function DParameters<T>(name: string, age: number, test: null): T;

type CatName = "miffy" | "boris" | "mordred";

// 根据union提取由type/interface声明的类型
type TestPickType = Pick<ITodo, "title" | "age" | "test">;

// 根据union排除由type/interface声明的类型
type TestOmitType = Omit<ITodo, "title" | "age" | "test">;

// 提取union中的类型
type TestExtractType = Extract<UnionType, "a" | "b" | "z">;

// 排除union中的类型
type TestExcludeType = Exclude<UnionType, "a" | "b" | "z">;

// 给所有union类型，设置对应的类型
type TestRecordType = Record<UnionType, CatInfo>;

// 提取函数的参数
type TestParameters1Type = Parameters<(name: string, age: number) => void>;

type TestParameters2Type = Parameters<typeof DParameters>;

// 提取函数的return
type TestReturnTypeType = ReturnType<(name: string, age: number) => void>;

type TestReturnType2Type = ReturnType<typeof DParameters>;

// 提取promise最终传递的值可以是union类型
type TestAwaitedType = Awaited<boolean | Promise<Promise<number>>>;

// 所有属性变成可选
type TestPartialType = Partial<CatInfo>;

// 所有属性变成必选
type TestRequiredType = Required<TestPartialType>;

// 所有属性变成只读
type TestReadonlyType = Readonly<TestPartialType>;
