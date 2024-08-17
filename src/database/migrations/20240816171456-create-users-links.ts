'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users_links', {
      link_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'links',
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        primaryKey: true,
        allowNull: false,
      },
    }, {
      timestamps: false
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('users_links');
  }
};
