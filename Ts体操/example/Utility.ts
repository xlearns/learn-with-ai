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

type TestPickType = Pick<ITodo, "title" | "age" | "test">;

type TestOmitType = Omit<ITodo, "title" | "age" | "test">;

type TestExtractType = Extract<UnionType, "a" | "b" | "z">;

type TestExcludeType = Exclude<UnionType, "a" | "b" | "z">;

type TestRecordType = Record<UnionType, CatInfo>;

type TestParameters1Type = Parameters<(name: string, age: number) => void>;

type TestParameters2Type = Parameters<typeof DParameters>;

type TestReturnTypeType = ReturnType<(name: string, age: number) => void>;

type TestReturnType2Type = ReturnType<typeof DParameters>;

type TestAwaitedType = Awaited<boolean | Promise<Promise<number>>>;

type TestPartialType = Partial<CatInfo>;

type TestRequiredType = Required<TestPartialType>;

type TestReadonlyType = Readonly<TestPartialType>;
