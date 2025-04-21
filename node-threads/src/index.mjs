import express from 'express';
import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get('/', async (req, res) => {
        // Simulate CPU-intensive task
        await cpuIntensiveTask()
        res.send('Hello World!');
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} else {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    }

    // Send the result back to the main thread
    parentPort.postMessage(sum);
}

function cpuIntensiveTask() {
    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL(import.meta.url));
        worker.on('message', (result) => {
            resolve(result);
        });
    });
}
