import chalk from 'chalk';

export const logger = (req, res, next) => {
  res.on('finish', function() {
    console.log(chalk.green(`method: ${req.method}`));

    if (req.params) {
      for (const param in req.params) {
        console.log(chalk.green(`param ${param} : ${req.params[param]}`));
      }
    }

    if (req.body) {
      for (const param in req.body) {
        console.log(chalk.green(`body ${param} : ${req.body[param]}`));
      }
    }

    if (req.query) {
      for (const param in req.query) {
        console.log(chalk.green(`query ${param} : ${req.query[param]}`));
      }
    }
  });

  next();
};