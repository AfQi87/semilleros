const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "evento_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "eventos_model"
      }
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "proyecto_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "proyectos_model"
      }
    }
  };
  const options = {
    tableName: "proyecto_eventos",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const ProyectoEventosModel = sequelize.define("proyecto_eventos_model", attributes, options);
  return ProyectoEventosModel;
};