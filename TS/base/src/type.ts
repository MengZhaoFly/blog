// ts 中的原始数据类型: boolean number string undefinde null symbol void bigint
const isLoading: boolean = false
const decLitteral: number = 6
const hexLiteral: number = 0xf00d // 进制也是 number 类型
const book: string = '字符串'

// void 空类型
function user1(): void {
  console.log('name')
}

const a = undefined
const b = null
let u = undefined
let n = null
const sym1 = Symbol('key1')
const sym2 = Symbol('key2')

const max = Number.MAX_SAFE_INTEGER
const max1 = max + 1
const max2 = max + 2

/* const maxs = BigInt(Number.MAX_SAFE_INTEGER) // bigint 大数整型，解决 js 最大值问题
const maxs1 = maxs + 1n
const maxs2 = maxs + 2n */