const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Adjusted seeding for projects
  for (const project of projectData) {
    await Project.create({
      name: project['item name'],
      description: project.description,
      date_created: new Date(), // You may want to adjust this based on your needs
      needed_funding: project.pricing,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();