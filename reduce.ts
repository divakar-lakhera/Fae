import { isArrayLike, isIterable, isIterator } from "./utils/is.ts"
import { getIterator } from "./utils/get.ts"
import curryN from "./utils/curry_n.ts"
import { Curry3 } from "./utils/types.ts"

function _arrayReduce<T, R = T>(func: Function, list: ArrayLike<T>, acc: R) {
  for(let i = 0, l = list.length; i < l; i++) {
    acc = func(acc, list[i])
  }
  return acc
}

function _iterableReduce<T, R = T>(func: Function, it: Iterator<T>, acc: R) {
  let step = it.next()
  while(!step.done) {
    acc = func(acc, step.value)
    step = it.next()
  }
  return acc
}

function reduce<T, R = T>(func: Function, list: Iterable<T> | Iterator<T>, acc: R) {
  if(isArrayLike(list)) return _arrayReduce(func, list, acc)
  if(isIterable(list)) return _iterableReduce(func, getIterator<T>(list), acc)
  if(isIterator(list)) return _iterableReduce(func, list, acc)
}

export default curryN<typeof reduce>(3, reduce) as Curry3<Function, Iterable<unknown> | Iterator<unknown>, unknown, unknown>