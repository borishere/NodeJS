export const groupModel = (dbInstance, dataTypes) => {
  return dbInstance.define('group', {
    id: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    name: dataTypes.STRING,
    permissions: dataTypes.ARRAY(dataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
  });
};
