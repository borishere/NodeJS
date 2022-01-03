import express from 'express';
import { userService } from '../../services/userService.js';
import { createUserSchema, updateUserSchema, validator } from '../../models/validator.js';

export const router = express.Router();

router.post('/users', createUserSchema, async (req, res) => {
  const userDTO = req.body;

  await userService.createUser(userDTO);

  return res.end();
})
  .get('/users/autosuggest', async (req, res) => {
    const query = req.query;
    const filteredUsers = await userService.getAutoSuggestUsers(query);

    res.status(200).json(filteredUsers).end();
  })
  .get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUser(userId);

    if (!user) {
      res.status(404).end();

      return;
    }

    res.status(200).json(user).end();
  })
  .delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    await userService.deleteUser(userId);

    res.status(200).end();
  })
  .patch('/users/:id', validator.body(updateUserSchema), async (req, res) => {
    const userId = req.params.id;
    const userDTO = req.body;

    const newUser = await userService.updateUser(userId, userDTO);

    if (!newUser) {
      res.status(404).end();
    }

    res.status(200).end();
  });
