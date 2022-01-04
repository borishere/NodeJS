import chalk from 'chalk';

export const apiErrorLogger = (err, req, res, next) => {
  if (err) {
    console.log(chalk.red(`method: ${req.method}`));

    if (Object.keys(req.params).length) {
      console.log(chalk.red(`params: ${JSON.stringify(req.params, null, 2)}`));
    }

    if (Object.keys(req.body).length) {
      console.log(chalk.red(`body: ${JSON.stringify(req.body, null, 2)}`));
    }

    if (Object.keys(req.query).length) {
      console.log(chalk.red(`query: ${JSON.stringify(req.query, null, 2)}`));
    }

    console.log(chalk.red(err));
  }

  next(err);
};
