// customErrorFormatter.js
module.exports = function customErrorFormatter(error, colors) {
  const messageColor =
    error.severity === 'warning' ? colors.bold.yellow : colors.bold.red;
  return (
    'Does not compute.... ' +
    messageColor(
      Object.keys(error)
        .map(key => `${key}: ${error[key]}`)
        .join('\n'),
    )
  );
};
