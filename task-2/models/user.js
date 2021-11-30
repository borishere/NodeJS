export const userModel = (dbInstance, dataTypes) => {
  return dbInstance.define('user', {
    id: {
      type: dataTypes.STRING,
      primaryKey: true
    },
    login: dataTypes.STRING,
    password: dataTypes.STRING,
    age: dataTypes.INTEGER,
    isdeleted: dataTypes.BOOLEAN
  });
};
