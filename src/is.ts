const typeOf = typeof (undefined as any);

export type TypeNames = typeof typeOf;
export type TypeForName<T> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "bigint"
      ? bigint
      : T extends "boolean"
        ? boolean
        : T extends "symbol"
          ? symbol
          : T extends "undefined"
            ? undefined
            : T extends "object"
              ? object
              : T extends "function"
                ? Function
                : never;
export type FalseyValues = undefined | false | null | 0 | -0 | 0n | "";

function is<T extends TypeNames>(
  arg: T,
): <TValue extends unknown>(
  value: TValue,
) => value is Extract<TValue, TypeForName<T>>;

function is(
  arg: "truthy",
): <TValue extends unknown>(
  value: TValue,
) => value is Exclude<TValue, FalseyValues>;

function is(
  arg: "falsey",
): <TValue extends unknown>(
  value: TValue,
) => value is Extract<TValue, FalseyValues>;

function is<TFunc extends { new (): any }>(
  arg: TFunc,
): <TValue extends unknown>(
  value: TValue,
) => value is TFunc extends { new (): infer T } ? Extract<TValue, T> : never;

function is(arg: any) {
  if (
    [
      "string",
      "number",
      "bigint",
      "boolean",
      "symbol",
      "undefined",
      "object",
      "function",
    ].includes(arg)
  ) {
    return (value: unknown) => typeof value === arg;
  }
  if (arg === "truthy") {
    return (value: unknown) => Boolean(value);
  }
  if (arg === "falsey") {
    return (value: unknown) => !Boolean(value);
  }
  if (typeof arg === "function") {
    return (value: unknown) => value instanceof arg;
  }
  return (value: unknown) => true;
}

export { is };
