function getPropValue<T extends object, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name: string;
  age: number;
}

const obj: IPerson = {
  name: "guang",
  age: 18,
};

interface SayHello {
  (name: string): string;
}

const func: SayHello = (name: string) => {
  return "hello," + name;
};

type MapType<T> = {
  [K in keyof T as `${K & string}${K & string}${K & string}`]: [
    T[K],
    T[K],
    T[K]
  ];
};

type resType = MapType<{ a: 1; b: 1 }>;

type IntersectionType = (string | number | symbol) & string;
