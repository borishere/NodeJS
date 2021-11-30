import express from 'express';
import Sequelize from 'sequelize';
import { userModel } from './models/user.js';
import { router } from './routers/controllers/router.js';
const { QueryTypes } = Sequelize;

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
  User: userModel(sequelize, Sequelize.DataTypes)
};

models.User.sync().then(async () => {
  const users = await models.User.findAll();

  if (users.length > 0) {
    return;
  }

  try {
    await sequelize.query(
      `INSERT INTO users(id, login, password, age, isdeleted)
      VALUES
      (16150, 'Kamren', 'OtH39s6EMyJOo5W', 23, true),
      (53771, 'Katharina', 'lUgWme3ZG2kpLKT', 30, false),
      (79873, 'Ila', 'TwjjwAavhk5wRyh', 56, false),
      (71147, 'Zella', 'jKSR6ybONuHBW9h', 63, false),
      (98189, 'Jayde', 'IpcTWx9k_TbAszu', 13, true)`,
      { type: QueryTypes.INSERT });
  } catch (e) {
    console.log('error sync db', e);
  }
});

app.use(express.json());
app.use(router);
app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).json({error: err});
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
