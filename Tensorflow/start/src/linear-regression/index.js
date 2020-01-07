import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = async () => {
    const xs = [1, 2, 3, 4];
    const ys = [1, 3, 5, 7];

    tfvis.render.scatterplot(
        { name: '线性回归训练集' },
        { values: xs.map((x, i) => ({ x, y: ys[i] })) },
        { xAxisDomain: [0, 5], yAxisDomain: [0, 8] }
    );
    // Creates a tf.Sequential model
    const model = tf.sequential();
    // Creates a dense (fully connected) layer.
    // 单个神经元 每一个神经元 为一个数字
    model.add(tf.layers.dense({ units: 1, inputShape: 1 }));
    // 设置损失函数
    // loss：损失
    // meanSquaredError: 均方误差

    // optimizer 优化器
    // sgd 随机梯度下降（SGD）
    // 1 .5 .3 .2 .1 0.01
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) });

    // 将训练数据转为 tensor
    const inputs = tf.tensor(xs);
    const labels = tf.tensor(ys);
    /**
     * fit: 拟合
     * epochs: 迭代多少次
     * batchSize：1 给模型1个数据
     * epochs：
     * 超参数：需要不停的试
     */
    await model.fit(inputs, labels, {
        batchSize: 4,
        epochs: 100,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练过程' },
            ['loss'] // metric 查看损失值 loss
        )
    });
    // 待预测的 数据转为 tensor
    const output = model.predict(tf.tensor([6]));
    console.log(`如果 x 为 5，那么预测 y 为 ${output.dataSync()[0]}`);
};