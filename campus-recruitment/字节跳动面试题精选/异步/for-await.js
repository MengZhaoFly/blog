var arr = [1, 2, 3];
async function a(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  })
}


// 1  不可以？？？？？
// async function test() {
//   arr.forEach(async x => {
//     const res = await a(x);
//     console.log(res);
//   })
// }

// test();
// 停1s => 1 停1s => 4 停1s => 9
// 停1s => 1 4 9    


// 2
// async function test1() {
//   for (let x of arr) {
//     const res = await a(x);
//     console.log(res);
//   }
// }
// test1();

// 3
// async function test2() {
//   for (let x of arr) {
//     // 生成 3 个 1s 到期的 Promise
//     // Promise.then( Promise.then( Promise ) )
//     c(x);
//   }
// }
// // foreach callback
// // c => Promise
// async function c(x) {
//   const res = await a(x);
//   console.log(res);
// }
// test2();

// 4
// async function test3(){
//   for(let x of arr){
//       await c(x);
//   }
// }
// async function c(x){
//     const res = await a(x);
//     console.log(res);
// }
// test3();

// 现在再来看开始的题目，我把它改写成这样：

// 5
async function test4(){
    for(let x of arr){
        await (async arg=>{
            const res = await a(arg);
            console.log(res);
        })(x)
    }
}
test4();


// 给forEach传了个异步回调函数，但是forEach并没有等待它，
//forEach在一瞬间就把所有的回调函数都执行了，
//异步的回调函数们自己在等待Promise。1s后，所有的Promise都完成了