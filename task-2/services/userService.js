import { v4 as uuidv4 } from 'uuid';
import { db } from '../data-access/db.js';

function getAutoSuggest(users, loginSubstring, limit) {
  let filteredUsers = [...users];

  filteredUsers = filteredUsers
    .sort((a, b) => a.login.localeCompare(b.login))
    .filter((user) => user.login.includes(loginSubstring))
    .slice(0, limit);

  return filteredUsers;
}

export const userService = {
  createUser: async (userDTO) => {
    const newUser = {
      id: uuidv4(),
      login: userDTO.login,
      password: userDTO.password,
      age: userDTO.age,
      isdeleted: false
    };

    await db.user.createUser(newUser);
  },

  getAutoSuggestUsers: async (query) => {
    const users = await db.user.getUsers();

    if (!users.length) {
      return [];
    }

    return getAutoSuggest(users, query.loginSubstring, query.limit);
  },

  getUser: async (userId) => {
    const user = await db.user.getUser(userId);

    if (!user) {
      return null;
    }

    return user;
  },

  deleteUser: async (userId) => {
    await db.user.deleteUser(userId);
  },

  updateUser: async (userId, userDTO) => {
    const foundUser = await db.user.getUser(userId);

    if (!foundUser) {
      return null;
    }

    const user = await db.user.updateUser(userId, userDTO);

    return user;
  }
};