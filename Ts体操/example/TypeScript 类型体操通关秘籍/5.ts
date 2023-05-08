type BuildArrayType<Num, R extends unknown[] = []> = R["length"] extends Num
	? R
	: BuildArrayType<Num, [...R, unknown]>;

// 错误写法会提示深度过长
// type BuildArrayType2<Num, R extends unknown[] = []> = Num extends R["length"]
// 	? R
// 	: BuildArrayType<Num, [...R, unknown]>;

type Add<A, B> = [...BuildArrayType<A>, ...BuildArrayType<B>]["length"];

type AddResult = Add<32, 25>;

type Sub<A, B> = BuildArrayType<A> extends [...BuildArrayType<B>, ...infer rest]
	? rest["length"]
	: never;

type SubResult = Sub<32, 25>;

type Mutiply<
	Num1 extends number,
	Num2 extends number,
	Result extends unknown[] = []
> = Num2 extends 0
	? Result["length"]
	: Mutiply<Num1, Sub<Num2, 1>, [...BuildArrayType<Num1>, ...Result]>;

type MutiplyResult = Mutiply<1, 2>;
