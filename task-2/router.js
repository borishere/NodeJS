import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { app } from './task2.js';
import { validator, bodySchema } from './validator.js';

export const router = express.Router();

function getAutoSuggestUsers(loginSubstring, limit) {
  let users = [...app.locals.users];

  users = users
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((user) => user.login.includes(loginSubstring))
    .slice(0, limit);

  return users;
}

router.post('/users', validator.body(bodySchema), (req, res) => {
  const userBody = req.body;

  const newUser = {
    id: uuidv4(),
    login: userBody.login,
    password: userBody.password,
    age: userBody.age
  };

  req.app.locals.users.push(newUser);

  res.end();
})
  .get('/users/autosuggest', (req, res) => {
    const query = req.query;
    const users = req.app.locals.users;

    if (!users.length) {
      res.status(200).json([]).end();

      return;
    }

    const filteredUsers = getAutoSuggestUsers(query.loginSubstring, query.limit);

    res.status(200).json(filteredUsers).end();
  })
  .get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = req.app.locals.users.find((user) => user.id === userId);

    if (!user) {
      res.status(404).end();

      return;
    }

    res.status(200).json(user).end();
  })
  .delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userExists = req.app.locals.users.some((user) => user.id === userId);

    if (!userExists) {
      res.status(404).end();

      return;
    }

    req.app.locals.users = req.app.locals.users.map((user) => {
      if (user.id === userId) {
        user.isDeleted = true;
      }

      return user;
    });

    res.status(200).end();
  })
  .patch('/users/:id', validator.body(bodySchema), (req, res) => {
    const userId = req.params.id;
    const userExists = req.app.locals.users.some((user) => user.id === userId);

    if (!userExists) {
      res.status(404).end();

      return;
    }

    const userBody = req.body;

    req.app.locals.users = req.app.locals.users.map((user) => {
      if (user.id === userId) {
        user.login = userBody?.login || user.login;
        user.password = userBody?.password || user.password;
        user.age = userBody?.age || user.age;
      }

      return user;
    });

    res.status(200).end();
  });
