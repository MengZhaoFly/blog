import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';

window.onload = async () => {
  const heights = [
    150, 160, 170,
  ]
  // [0, .5, 1]
  const weights = [
    40, 50, 60
  ]

  tfvis.render.scatterplot(
    { name: 'heaight-weight' },
    {
      values: heights.map((h, i) => {
        return {
          x: h,
          y: weights[i]
        }
      })
    },

    {
      xAxisDomain: [140, 180],
      yAxisDomain: [30, 70]
    }
  )

  const heightInput = tf.tensor(heights)
    .sub(150).div(20);
  const weightInput = tf.tensor(weights)
    .sub(40).div(20);

  const model = tf.sequential()
  const layer = tf.layers.dense({
    units: 1,
    inputShape: 1
  })
  model.add(layer);

  model.compile({
    loss: tf.losses.meanSquaredError,
    optimizer: tf.train.sgd(0.1)
  })

  await model.fit(heightInput, weightInput, {
    batchSize: 3,
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss']
    )
  })

  const output = model.predict(tf.tensor([180]).sub(150).div(20));
  console.log(`如果身高为 180cm，那么预测体重为 ${output.mul(20).add(40).dataSync()[0]}kg`);



}