'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      descripcion: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      fecha_inicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_fin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lugar: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      tipo_evento_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'tipo_eventos',
          key: 'id',
          as: 'tipo_evento_id'
        }
      },
      modalidad_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'modalidads',
          key: 'id',
          as: 'modalidad_id'
        }
      },
      clasificacion_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'clasificacions',
          key: 'id',
          as: 'clasificacion_id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('eventos');
  }
};