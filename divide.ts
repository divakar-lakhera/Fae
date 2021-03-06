import curryN from './utils/curry_n.ts'
import type { PH } from './utils/types.ts'

// @types
// prettier-ignore
type Divide_2 = ((b: number) => number)
  & ((b?: PH) => Divide_2)

// prettier-ignore
type Divide_1 = ((a: number) => number)
  & ((a?: PH) => Divide_1)

// prettier-ignore
type Divide = ((a: number, b: number) => number)
  & ((a: number, b?: PH) => Divide_2)
  & ((a: PH, b: number) => Divide_1)
  & ((a?: PH, b?: PH) => Divide)

function _divide(a: number, b: number) {
  return a / b
}

/**
 * Divides two numbers. Equivalent to `a / b`.
 */
export const divide: Divide = curryN(2, _divide)
