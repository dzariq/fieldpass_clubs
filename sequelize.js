const { Sequelize } = require('sequelize');

// Replace 'your_database_name', 'your_database_user', and 'your_database_password' with your MySQL database details
const sequelize = new Sequelize('fieldpass_club', 'ligakita', '#1Sampai9', {
  host: '104.248.75.228',
  dialect: 'mysql',
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
