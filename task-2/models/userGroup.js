export const userGroupModel = (dbInstance, dataTypes) => {
  return dbInstance.define('user_group', {
    userId: {
      type: dataTypes.STRING,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    groupId: {
      type: dataTypes.STRING,
      references: {
        model: 'groups',
        key: 'id'
      }
    }
  });
};
