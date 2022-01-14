import { models } from '../task2.js';

export const db = {
  user: {
    getUser: async (userId) => {
      const user = await models.User.findOne({
        where: { id: userId },
        raw: true
      });

      return user;
    },

    getUserByCredentials: async (login, password) => {
      const credentials = { login };

      if (password) {
        credentials.password = password;
      }

      const user = await models.User.findOne({
        where: credentials,
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
  },

  group: {
    getGroup: async (groupId) => {
      const group = await models.Group.findOne({
        where: { id: groupId },
        raw: true
      });

      return group;
    },

    getGroups: async () => {
      const groups = await models.Group.findAll({ raw: true });

      return groups;
    },

    deleteGroup: async (groupId) => {
      await models.Group.destroy(
        { where: { id: groupId } }
      );
    },

    createGroup: async (newGroup) => {
      await models.Group.create(newGroup);
    },

    updateGroup: async (groupId, groupDTO) => {
      const group = await models.Group.update(
        groupDTO,
        { where: { id: groupId } }
      );

      return group;
    }
  },

  userGroup: {
    addUserGroup: async (userId, groupId, transaction) => {
      await models.UserGroup.create(
        { userId, groupId },
        { transaction }
      );
    }
  }
};
