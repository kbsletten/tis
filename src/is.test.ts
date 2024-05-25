import { is } from "./is";

const types = [
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "undefined",
  "object",
  "function",
] as const;

const values = [
  undefined,
  true,
  false,
  0,
  -0,
  NaN,
  BigInt(0),
  "",
  null,
  {},
  [],
  () => {},
];

const constructors = [Boolean, Number, String, Object, Array, Function];

describe("is", () => {
  for (const type of types) {
    it(`checks types: ${type}`, () => {
      const isType = is(type);
      for (const value of values) {
        expect(isType(value)).toBe(typeof value === type);
      }
    });
  }

  it("checks truthy values", () => {
    const isTruthy = is("truthy");
    for (const value of values) {
      expect(isTruthy(value)).toBe(Boolean(value));
    }
  });

  it("checks falsey values", () => {
    const isFalsey = is("falsey");
    for (const value of values) {
      expect(isFalsey(value)).toBe(!Boolean(value));
    }
  });

  for (const constructor of constructors) {
    it(`checks isinstance: ${constructor.name}`, () => {
      const isInstance = is(constructor);
      for (const value of values) {
        expect(isInstance(value)).toBe(value instanceof constructor);
      }
    });
  }

  it("allows typescript to use type information", () => {
    class Animal {}
    class Mammal extends Animal {
      breathe() {}
    }
    class Dog extends Mammal {
      bark() {}
    }
    const creatures = [new Animal(), new Mammal(), new Dog()] as const;
    const isMammal = is(Mammal);
    const isDog = is(Dog);
    for (const creature of creatures) {
      if (isMammal(creature)) {
        creature.breathe();
      }
      if (isDog(creature)) {
        creature.bark();
      }
    }
  });
});
