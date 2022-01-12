import { db } from '../data-access/db.js';
import { sequelize } from '../task2.js';

export const userGroupService = {
  addUsersToGroup: async (groupId, userIds) => {
    await sequelize.transaction(async (transaction) => {
      for (const userId of userIds) {
        await db.userGroup.addUserGroup(userId, groupId, transaction);
      }
    });
  }
};