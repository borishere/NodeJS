import express from 'express';
import { userService } from '../../services/userService.js';
import { createUserSchema, updateUserSchema, validator } from '../../models/validator.js';
import chalk from 'chalk';

export const userRouter = express.Router();

userRouter.post('/users', createUserSchema, async (req, res, next) => {
  const userDTO = req.body;

  try {
    await userService.createUser(userDTO);

    return res.end();
  } catch (error) {
    next(error);
  }
})
  .get('/users/autosuggest', async (req, res, next) => {
    const query = req.query;
    const filteredUsers = await userService.getAutoSuggestUsers(query);

    res.status(200).json(filteredUsers).end();
  })
  .get('/users/:id', async (req, res, next) => {
    const userId = req.params.id;
    const user = await userService.getUser(userId);

    if (!user) {
      res.status(404).end();

      return;
    }

    res.status(200).json(user).end();
  })
  .delete('/users/:id', async (req, res, next) => {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    res.status(200).end();
  })
  .patch('/users/:id', validator.body(updateUserSchema), async (req, res, next) => {
    const userId = req.params.id;
    const userDTO = req.body;

    try {
      const newUser = await userService.updateUser(userId, userDTO);

      if (!newUser) {
        res.status(404).end();
      }

      res.status(200).end();
    } catch (error) {
      next(error);
    }
  });

userRouter.use(function(err, req, res, next) {
  if (err) {
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

    console.log(chalk.red(err));
  }

  next(err);
});
