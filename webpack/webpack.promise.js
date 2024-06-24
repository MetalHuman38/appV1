module.exports = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        entry: './src/main.tsx',
        /* ... */
      });
    }, 5000);
  });
};
