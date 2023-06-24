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
    correo: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "correo",
      autoIncrement: false
    },
    nombre: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "nombre",
      autoIncrement: false
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "logo",
      autoIncrement: false
    },
    descripcion: {
      type: DataTypes.CHAR(500),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "descripcion",
      autoIncrement: false
    },
    fecha_resolucion: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_resolucion",
      autoIncrement: false
    },
    numero_resolucion: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "numero_resolucion",
      autoIncrement: false
    },
    archivo_resolucion: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "archivo_resolucion",
      autoIncrement: false
    },
    coordinador_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "coordinador_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "coordinadors_model"
      }
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "estado_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "estado_usuarios_model"
      }
    }
  };
  const options = {
    tableName: "semilleros",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const SemillerosModel = sequelize.define("semilleros_model", attributes, options);

  SemillerosModel.associate = function (models) {
    SemillerosModel.belongsTo(models.coordinadors_model, {
      foreignKey: 'coordinador_id',
      as: "coordinador"
    });
    SemillerosModel.belongsTo(models.estado_usuarios_model, {
      foreignKey: 'estado_id',
      as: "estado"
    });
    SemillerosModel.hasMany(models.lineas_semilleros_model, {
      foreignKey: 'semillero_id',
      as: "linea"
    });
  };

  return SemillerosModel;
};