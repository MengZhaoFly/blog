export function getData(numSamples) {
  let points = [];
  /**
   * 生成高斯分布 / 正态分布
   */
  function genGauss(cx, cy, label) {
    for (let i = 0; i < numSamples / 2; i++) {
      let x = normalRandom(cx);
      let y = normalRandom(cy);
      points.push({ x, y, label });
    }
  }
  // 以  2，2 为中心的一堆点
  genGauss(2, 2, 1);
  // 以  -2，-2 为中心的一堆点
  genGauss(-2, -2, 0);
  return points;
}

/**
 * Samples from a normal distribution. Uses the seedrandom library as the
 * random generator.
 *
 * @param mean The mean. Default is 0.
 * @param variance The variance. Default is 1. variance 越大 生成点的范围越大
 */
function normalRandom(mean = 0, variance = 1) {
  // let v1, v2, s;
  // do {
  //   v1 = 2 * Math.random() - 1;  // -1 ~ 1  ^2  1
  //   v2 = 2 * Math.random() - 1;  // -1 ~ 1
  //   s = v1 * v1 + v2 * v2;
  // } while (s > 1);

  // let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  let v1 =  Math.random();  // -1 ~ 1  ^2  1
  let v2 =  Math.random();  // -1 ~ 1
  let result = Math.sqrt(-2 * Math.log(v1)) * Math.cos(2 * Math.PI * v2);
  // return mean + Math.sqrt(variance) * result;
  return result + mean;
}