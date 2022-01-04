import express from 'express';
import Sequelize from 'sequelize';
import { logger } from './middleware/logger.js';
import { createWinstonLogger } from './middleware/winstonLogger.js';
import { groupModel } from './models/group.js';
import { userModel } from './models/user.js';
import { userGroupModel } from './models/userGroup.js';
import { groupsRouter } from './routers/controllers/groupController.js';
import { userRouter } from './routers/controllers/userController.js';
import { userGroupService } from './services/userGroupService.js';
const { QueryTypes } = Sequelize;

const winstonLogger = createWinstonLogger();

export const app = express();
const PORT = 3000;

export const sequelize = new Sequelize('boris', 'boris', 'mypostgres', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});

export const models = {
  User: userModel(sequelize, Sequelize.DataTypes),
  Group: groupModel(sequelize, Sequelize.DataTypes),
  UserGroup: userGroupModel(sequelize, Sequelize.DataTypes)
};

models.User.belongsToMany(models.Group, { through: models.UserGroup });
models.Group.belongsToMany(models.User, { through: models.UserGroup });

const syncUser = models.User.sync().then(async () => {
  const users = await models.User.findAll();

  if (users.length > 0) {
    return;
  }

  try {
    return await sequelize.query(`
      INSERT INTO users(id, login, password, age, isdeleted)
      VALUES
      (16150, 'Kamren', 'OtH39s6EMyJOo5W', 23, true),
      (53771, 'Katharina', 'lUgWme3ZG2kpLKT', 30, false),
      (79873, 'Ila', 'TwjjwAavhk5wRyh', 56, false),
      (71147, 'Zella', 'jKSR6ybONuHBW9h', 63, false),
      (98189, 'Jayde', 'IpcTWx9k_TbAszu', 13, true)
      `,
      { type: QueryTypes.INSERT });
  } catch (e) {
    console.log('error sync db', e);
  }
});

const syncGroup = models.Group.sync().then(async () => {
  const groups = await models.Group.findAll();

  if (groups.length > 0) {
    return;
  }

  try {
    return await sequelize.query(`
      INSERT INTO groups(id, name, permissions)
      VALUES
      (73200, 'Admin', '{READ, WRITE, DELETE, SHARE, UPLOAD_FILES}'),
      (9957, 'Editor', '{READ, WRITE, UPLOAD_FILES}'),
      (73013, 'Reader', '{READ}')
      `,
      { type: QueryTypes.INSERT }
    );
  } catch (e) {
    console.log('error sync db', e);
  }
});

Promise.all([syncUser, syncGroup]).then(() => {
  models.UserGroup.sync().then(async () => {
    const entries = await models.UserGroup.findAll();

    if (entries.length > 0) {
      return;
    }

    try {
      await userGroupService.addUsersToGroup(73200, [16150, 98189, 53771, 79873, 71147]);
    } catch (e) {
      console.log('error sync db', e);
    }
  });
});

app.use(express.json());
app.use(logger);
app.use(userRouter, groupsRouter);
app.use(function(err, req, res, next) {
  if (err) {
    winstonLogger.error(err);
    res.status(500).json({ error: err });
  }
});

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  console.log(`Starting app on port ${PORT}...`);

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}.`);
  });
}

init();
