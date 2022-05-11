const seedUsers = require('./user-seeds');
const sequelize = require('../config/connection');
const seedEnemies = require('./enemy-seeds');
const seedCharacters = require('./character-seeds');
const seedItems = require('./item-seeds');

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

  await seedCharacters();
  console.log(`
  --------------
  Characters Seeded
  --------------
  `);

  await seedItems();
  console.log(`
  --------------
  Items Seeded
  --------------
  `);

  process.exit(0);
};

seedAll();
