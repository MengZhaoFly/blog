import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

window.onload = async () => {
    const data = getData(400);

    tfvis.render.scatterplot(
        { name: 'XOR 训练数据' },
        {
            values: [
                data.filter(p => p.label === 1),
                data.filter(p => p.label === 0),
            ]
        }
    );

    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 4,
        inputShape: [2],
        activation: 'relu'
    }));
    model.add(tf.layers.dense({
        units: 1,
        activation: 'sigmoid'
    }));
    model.compile({
        loss: tf.losses.logLoss,
        optimizer: tf.train.adam(0.1)
    });

    const inputs = tf.tensor(data.map(p => [p.x, p.y]));
    const labels = tf.tensor(data.map(p => p.label));

    await model.fit(inputs, labels, {
        epochs: 10,
        callbacks: tfvis.show.fitCallbacks(
            { name: '训练效果' },
            ['loss']
        )
    });

    const pred = model.predict(tf.tensor([[-2, 2]]));
    console.log(`预测结果：${pred.dataSync()}`);
};