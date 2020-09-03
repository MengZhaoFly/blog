
let middleWare1 = async function(ctx, next) {
  console.log(1);
  await next()
  console.log(2);
}
let middleWare2 = async function(ctx, next) {
  console.log(3);
}
// 1 3 2
let middleWares = [middleWare1, middleWare2];
run();
function run() {
  const dispatch = (index) => {
    const fn = middleWares[index];
    // 处理 next 让他去到下一个中间件
    fn({}, () => {
      dispatch(index + 1);
    })
  }
  /**
  async (ctx) => {
    console.log(1);
    await async(ctx) => {
      console.log(3)
      await async(ctx) => {
        console.log(4)
        await async(ctx) => {
        }
      }
    }
  }
  */
  dispatch(0);
}
