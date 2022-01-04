import express from 'express';
import { userService } from '../../services/userService.js';
import { createUserSchema, updateUserSchema, validator } from '../../models/validator.js';
import { apiErrorLogger } from '../../middleware/apiErrorLogger.js';

export const userRouter = express.Router();

userRouter.post('/users', createUserSchema, async (req, res, next) => {
  try {
    const userDTO = req.body;

    await userService.createUser(userDTO);

    return res.end();
  } catch (e) {
    next(e);
  }
})
  .get('/users/autosuggest', async (req, res, next) => {
    try {

      const query = req.query;
      const filteredUsers = await userService.getAutoSuggestUsers(query);

      res.status(200).json(filteredUsers).end();
    } catch (e) {
      next(e);
    }
  })
  .get('/users/:id', async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);

      if (!user) {
        res.status(404).end();

        return;
      }

      res.status(200).json(user).end();

    } catch (e) {
      next(e);
    }
  })
  .delete('/users/:id', async (req, res, next) => {
    try {
      const userId = req.params.id;

      await userService.deleteUser(userId);

      res.status(200).end();
    } catch (e) {
      next(e);
    }
  })
  .patch('/users/:id', validator.body(updateUserSchema), async (req, res, next) => {
    try {
      const userId = req.params.id;
      const userDTO = req.body;

      const newUser = await userService.updateUser(userId, userDTO);

      if (!newUser) {
        res.status(404).end();
      }

      res.status(200).end();
    } catch (e) {
      next(e);
    }
  });

userRouter.use(apiErrorLogger);