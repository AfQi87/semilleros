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
    contraseña: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "contraseña",
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
    tableName: "cuenta_usuarios",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const CuentaUsuariosModel = sequelize.define("cuenta_usuarios_model", attributes, options);

  CuentaUsuariosModel.associate = function (models) {
    CuentaUsuariosModel.belongsTo(models.usuarios_model, {
      foreignKey: 'usuario_id',
      as: "usuario"
    });
  };
  return CuentaUsuariosModel;
};