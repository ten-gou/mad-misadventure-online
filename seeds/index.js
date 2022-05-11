const seedUsers = require('./user-seeds');
const sequelize = require('../config/connection');
const seedEnemies = require('./enemy-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log(`
  --------------
  Users Seeded
  --------------
  `);

  await seedEnemies();
  console.log(`
  --------------
  Enemies Seeded
  --------------
  `);

/*  await seedUsers();
  console.log(`
  --------------
  Users Seeded
  --------------
  `);
*/

  process.exit(0);
};

seedAll();
