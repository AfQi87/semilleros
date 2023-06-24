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
    codigo: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "codigo",
      autoIncrement: false
    },
    titulo: {
      type: DataTypes.CHAR(300),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "titulo",
      autoIncrement: false
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_inicio",
      autoIncrement: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_fin",
      autoIncrement: false
    },
    archivo_propuesta: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "archivo_propuesta",
      autoIncrement: false
    },
    archivo_proyecto_final: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "archivo_proyecto_final",
      autoIncrement: false
    },
    estado_proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "estado_proyecto_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "estado_proyectos_model"
      }
    },
    tipo_proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "tipo_proyecto_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "tipo_proyectos_model"
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
    tableName: "proyectos",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const ProyectosModel = sequelize.define("proyectos_model", attributes, options);

  ProyectosModel.associate = function (models) {
    ProyectosModel.belongsTo(models.estado_proyectos_model, {
      foreignKey: 'estado_proyecto_id',
      as: "estado"
    });
    ProyectosModel.belongsTo(models.tipo_proyectos_model, {
      foreignKey: 'tipo_proyecto_id',
      as: "tipo"
    });
    ProyectosModel.belongsTo(models.semilleros_model, {
      foreignKey: 'semillero_id',
      as: "semillero"
    });
  };
  return ProyectosModel;
};