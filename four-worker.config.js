const { workerData, parentPort } = require('worker_threads');

function doWork() {
  // Simulate some heavy computation
  let result = 0;
  for (let i = 0; i < 1e6 / workerData.thread_count; i++) {
    result += Math.random();
  }
  return result;
}

const result = doWork();
parentPort.postMessage(result);