'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      identificacion: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      direccion: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      correo: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      telefono: {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      fecha_nacimiento: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_vinculacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      genero_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'generos',
          key: 'id',
          as: 'genero_id'
        }
      },
      tipo_usuario_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'tipo_usuarios',
          key: 'id',
          as: 'tipo_usuario_id'
        }
      },
      estado_usuario_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'estado_usuarios',
          key: 'id',
          as: 'estado_usuario_id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};