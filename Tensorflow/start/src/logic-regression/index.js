import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

window.onload = async () => {
  const data = getData(400);

  tfvis.render.scatterplot(
    { name: '逻辑回归训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0),
      ]
    }
  );

  const model = tf.sequential();
  /**
   * Creates a dense (fully connected) layer.
     This layer implements the operation: output = activation(dot(input, kernel) + bias)
   */
  // sigmoid 能够帮我们把输出固定在 0 ~ 1 之间。
  model.add(tf.layers.dense({
    units: 1,
    inputShape: [2],   // 坐标[x, y]
    activation: 'sigmoid'
  }));
  model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)  // adam 自动帮我们调解学习速率
  });
  // 

  const inputs = tf.tensor(data.map(p => [p.x, p.y]));
  const labels = tf.tensor(data.map(p => p.label));

  // 400 个点 batchSize 40 （400 / 40 = 10）10 个 batch 就是一个 epoch 就把数据训练完一轮了
  // epochs 训练多少轮
  // 一个 epoch 训练 10 个数据
  await model.fit(inputs, labels, {
    batchSize: 40,
    epochs: 20,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss']
    )
  });

  const point = {
    x: -1,
    y: -2
  }
  const pred = model.predict(tf.tensor([[point.x, point.y]]));
  console.log(`预测结果：${pred.dataSync()[0]}`);
};