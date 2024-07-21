module.exports = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        entry: './src/main.tsx',
        output: {
          filename: 'bundle.js',
        }
      });
    }, 5000);
  });
};
