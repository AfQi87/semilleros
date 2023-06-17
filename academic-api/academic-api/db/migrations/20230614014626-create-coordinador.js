'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coordinadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      acuerdo_nombramiento: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      archivo_nombramiento: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'usuarios',
          key: 'id',
          as: 'usuario_id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('coordinadors');
  }
};