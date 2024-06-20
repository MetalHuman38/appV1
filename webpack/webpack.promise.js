module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './src/main.tsx',
        /* ... */
      });
    }, 5000);
  });
};
