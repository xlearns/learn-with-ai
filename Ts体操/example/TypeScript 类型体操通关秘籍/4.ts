// type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
// 	infer rest
// >
// 	? rest extends Promise<unknown>
// 		? DeepPromiseValueType<rest>
// 		: rest
// 	: never;

type DeepPromiseValueType2<T> = T extends Promise<infer ValueType>
	? DeepPromiseValueType2<ValueType>
	: T;

type ttt = Promise<Promise<Promise<Record<string, any>>>>;

type testDeep = DeepPromiseValueType2<ttt>;

type arr = [1, 2, 3, 4, 5];

type ReverseType<T> = T extends [...infer rest, infer last]
	? [last, ...ReverseType<rest>]
	: [];

type testArr = ReverseType<arr>;

type Includes<T, U> = T extends [infer first, ...infer last]
	? first extends U
		? true
		: Includes<last, U>
	: false;

type IncludesResult = Includes<[1, 2, 3, 4, 5], 4>;

type IncludesResult2 = Includes<[1, 2, 3, 4, 5], 6>;

type IsEqual<A, B> = (A extends B ? true : false) &
	(B extends A ? true : false);

type RemoveItem<T, U, R extends unknown[] = []> = T extends [
	infer first,
	...infer last
]
	? first extends U
		? RemoveItem<last, U, R>
		: RemoveItem<last, U, [...R, first]>
	: R;

type RemoveItemResult = RemoveItem<[1, 2, 2, 3], 2>;

type BuildArray<
	T,
	Ele = unknown,
	R extends unknown[] = []
> = R["length"] extends T ? R : BuildArray<T, Ele, [...R, Ele]>;

type BuildArrResult = BuildArray<5>; // <=1000
