import { PerformanceObserver, performance } from 'node:perf_hooks';

// Set up the PerformanceObserver
const obs = new PerformanceObserver(items => {
  items.getEntries().forEach(entry => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
  performance.clearMarks();
});
obs.observe({ type: 'measure' });

// Simulate the loader function
async function loader() {
  try {
    // Mark the start of the loader
    performance.mark('Loader Start', {
      detail: 'Loader started',
    });

    // Perform Task 1
    await doSomeLongRunningProcess();
    performance.mark('Task 1 End', {
      detail: 'Task 1 completed',
    });

    // Perform Task 2
    await doSomeLongRunningProcess();
    performance.mark('Task 2 End', {
      detail: 'Task 2 completed',
    });

    const loginMeasure = performance.measure(
      'Task 2 Duration',
      'Task 1 End',
      'Task 2 End'
    );

    console.log(loginMeasure.duration);

    // End of the loader
    performance.mark('Loader End');
    performance.measure('Total Loader Duration', 'Loader Start', 'Loader End');
  } catch (error) {
    console.error('Error in loader:', error);
  }
}

function doSomeLongRunningProcess() {
  // Return a promise that resolves after a timeout to simulate a long-running process
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000); // 1 second timeout to simulate the process duration
  });
}

export default loader;
