'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      fecha_inicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      fecha_fin: {
        allowNull: false,
        type: Sequelize.DATE
      },
      archivo_propuesta: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      archivo_proyecto_final: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      estado_proyecto_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'estado_proyectos',
          key: 'id',
          as: 'estado_proyecto_id'
        }
      },
      tipo_proyecto_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'tipo_proyectos',
          key: 'id',
          as: 'tipo_proyecto_id'
        }
      },
      semillero_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'semilleros',
          key: 'id',
          as: 'semillero_id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('proyectos');
  }
};