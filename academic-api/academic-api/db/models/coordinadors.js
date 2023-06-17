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
    acuerdo_nombramiento: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "acuerdo_nombramiento",
      autoIncrement: false
    },
    archivo_nombramiento: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "archivo_nombramiento",
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
    tableName: "coordinadors",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const CoordinadorsModel = sequelize.define("coordinadors_model", attributes, options);

  CoordinadorsModel.associate = function (models) {
    CoordinadorsModel.belongsTo(models.usuarios_model, {
      foreignKey: 'usuario_id',
      as: "usuario"
    });
  };
  return CoordinadorsModel;
};