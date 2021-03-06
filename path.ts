import type { ObjRec, PH } from './utils/types.ts'
import { paths, Path } from './paths.ts'
import curryN from './utils/curry_n.ts'

// @types
type PathF_2 = (<T, R>(obj: ObjRec<T> | null) => R) &
  ((obj?: PH) => PathF_2)

type PathF_1<T, R> = ((ps: Path) => R) & ((ps?: PH) => PathF_1<T, R>)

type PathF = (<T, R>(ps: Path, obj: ObjRec<T> | null) => R) &
  ((ps: Path, obj?: PH) => PathF_2) &
  (<T, R>(ps: PH, obj: ObjRec<T> | null) => PathF_1<T, R>) &
  ((ps?: PH, obj?: PH) => PathF)

function _path<R, T = any>(ps: Path, obj: ObjRec<T> | null): R {
  return paths<T, R>([ps], obj)[0]
}

/**
 * Retrieve the value at a given path.
 * The path may be any array of keys or
 * string of keys separated by `/` or `.` .
 *
 *
 *      Fae.path(['a', 'b'], {a: {b: 2}}); 2
 *      Fae.path(['a', 'b'], {c: {b: 2}}); // undefined
 *      Fae.path('a/b/0', {a: {b: [1, 2, 3]}}); // 1
 *      Fae.path('a.b.0', {a: {b: [1, 2, 3]}}); // 2
 */
export const path: PathF = curryN(2, _path)
