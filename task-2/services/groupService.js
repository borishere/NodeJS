import { v4 as uuidv4 } from 'uuid';
import { db } from '../data-access/db.js';

export const groupService = {
  createGroup: async (groupDTO) => {
    const newGroup = {
      id: uuidv4(),
      name: groupDTO.name,
      permissions: groupDTO.permissions
    };

    await db.group.createGroup(newGroup);
  },

  getGroup: async (groupId) => {
    const group = await db.group.getGroup(groupId);

    if (!group) {
      return null;
    }

    return group;
  },

  getGroups: async () => {
    const groups = await db.group.getGroups();

    if (!groups) {
      return null;
    }

    return groups;
  },

  deleteGroup: async (groupId) => {
    await db.group.deleteGroup(groupId);
  },

  updateGroup: async (groupId, groupDTO) => {
    const foundGroup = await db.group.getGroup(groupId);

    if (!foundGroup) {
      return null;
    }

    const group = await db.group.updateGroup(groupId, groupDTO);

    return group;
  }
};