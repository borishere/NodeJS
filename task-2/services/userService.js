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

    await db.createUser(newUser);
  },

  getAutoSuggestUsers: async (query) => {
    const users = await db.getUsers();

    if (!users.length) {
      return [];
    }

    return getAutoSuggest(users, query.loginSubstring, query.limit);
  },

  getUser: async (userId) => {
    const user = await db.getUser(userId);

    if (!user) {
      return null;
    }

    return user;
  },

  deleteUser: async (userId) => {
    await db.deleteUser(userId);
  },

  updateUser: async (userId, userDTO) => {
    const foundUser = await db.getUser(userId);

    if (!foundUser) {
      return null;
    }

    const user = await db.updateUser(userId, userDTO);

    return user;
  }
};