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
    semillero_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "semillero_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "semilleros_model"
      }
    }
  };
  const options = {
    tableName: "semilleristas",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const SemilleristasModel = sequelize.define("semilleristas_model", attributes, options);
  return SemilleristasModel;
};