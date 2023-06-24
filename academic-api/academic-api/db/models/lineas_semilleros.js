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
    },
    linea_investigacion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "linea_investigacion_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "linea_investigacions_model"
      }
    }
  };
  const options = {
    tableName: "lineas_semilleros",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const LineasSemillerosModel = sequelize.define("lineas_semilleros_model", attributes, options);

  LineasSemillerosModel.associate = function (models) {
    LineasSemillerosModel.belongsTo(models.linea_investigacions_model, {
      foreignKey: 'linea_investigacion_id',
      as: "lineaInvestigacion"
    });
  };

  return LineasSemillerosModel;
};