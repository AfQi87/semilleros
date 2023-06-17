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
    estudiante_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "estudiante_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "estudiantes_model"
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
    tableName: "proyecto_integrantes",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const ProyectoIntegrantesModel = sequelize.define("proyecto_integrantes_model", attributes, options);
  return ProyectoIntegrantesModel;
};