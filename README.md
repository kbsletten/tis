# 'Tis Inference System

Typescript has robust support for type guards, but writing functions that return `is` expressions is tedious. 'Tis aims to make it easy to add type guards.

## is

```
import { is } from 'tis';

const isString = is('string');
const isTruthy = is('truthy');
const isInstance = is(Constructor);

```

### is(typeof)

This form of `is` will narrow a type to only strings. It preserves constant string types if present.

### is("truthy" / "falsey")

This form of `is` will narrow a type to only truthy or falsey values. It will provide no type information when called on types of `string` or `number` which contain both truthy and falsey values.

### is(Constructor)

This form of `is` will narrow a type to types that are instances of a constructor.
