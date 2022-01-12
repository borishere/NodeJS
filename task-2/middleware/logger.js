import chalk from 'chalk';

export const infoLogger = (req, res, next) => {
  res.on('finish', function() {
    console.log(chalk.blue(`method: ${req.method}`));

    if (Object.keys(req.params).length) {
      console.log(chalk.blue(`params: ${JSON.stringify(req.params, null, 2)}`));
    }

    if (Object.keys(req.body).length) {
      console.log(chalk.blue(`body: ${JSON.stringify(req.body, null, 2)}`));
    }

    if (Object.keys(req.query).length) {
      console.log(chalk.blue(`query: ${JSON.stringify(req.query, null, 2)}`));
    }
  });

  next();
};