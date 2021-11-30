import { models } from '../task2.js';

export const db = {
  getUser: async (userId) => {
    const user = await models.User.findOne({
      where: { id: userId },
      raw: true
    });

    return user;
  },

  getUserByLogin: async (login) => {
    const user = await models.User.findOne({
      where: { login: login },
      raw: true
    });

    return user;
  },

  getUsers: async () => {
    const users = await models.User.findAll({ raw: true });

    return users;
  },

  deleteUser: async (userId) => {
    await models.User.update(
      { isdeleted: true },
      { where: { id: userId } }
    );
  },

  createUser: async (newUser) => {
    await models.User.create(newUser);
  },

  updateUser: async (userId, userDTO) => {
    const user = await models.User.update(
      userDTO,
      { where: { id: userId } }
    );

    return user;
  }
};