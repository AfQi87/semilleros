'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('semilleros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      correo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING(500)
      },
      fecha_resolucion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      numero_resolucion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      archivo_resolucion: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      coordinador_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'coordinadors',
          key: 'id',
          as: 'coordinador_id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('semilleros');
  }
};