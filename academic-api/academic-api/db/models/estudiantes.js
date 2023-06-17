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
    semestre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "semestre",
      autoIncrement: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "usuario_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "usuarios_model"
      }
    }
  };
  const options = {
    tableName: "estudiantes",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const EstudiantesModel = sequelize.define("estudiantes_model", attributes, options);

  EstudiantesModel.associate = function (models) {
    EstudiantesModel.belongsTo(models.usuarios_model, {
      foreignKey: 'usuario_id',
      as: "usuario"
    });
  };

  return EstudiantesModel;
};