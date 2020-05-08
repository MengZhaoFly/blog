const toString = Object.prototype.toString

export function isDate (val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject (val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
export function extend<T, U>(to: T, from: U): T & U {
  const result: Partial<T & U> = to;
    for (const prop in from) {
      // (result as U)[prop] = from[prop];
      (result as U)[prop] = from[prop];
    }
    return result as T & U;
}