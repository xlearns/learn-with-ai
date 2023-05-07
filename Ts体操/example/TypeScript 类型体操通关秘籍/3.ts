type tuple1 = [1, 2];
type tuple2 = ["guang", "dong"];

type ZipType<
  T1 extends [unknown, unknown],
  T2 extends [unknown, unknown]
> = T1 extends [infer T11, infer T12]
  ? T2 extends [infer T21, infer T22]
    ? [[T11, T21], [T12, T22]]
    : []
  : [];

type testZipType = ZipType<tuple1, tuple2>;
