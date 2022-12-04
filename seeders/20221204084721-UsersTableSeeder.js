'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("1234", salt);
    await queryInterface.bulkInsert("Users", [
      {
        name: "superadmin",
        email: "superadmin@gmail.com",
        role: "superadmin",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
