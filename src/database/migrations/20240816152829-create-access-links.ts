'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('access_links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'links',
          key: 'id',
        },
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    }, {
      timestamps: false
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('access_links');
  }
};
