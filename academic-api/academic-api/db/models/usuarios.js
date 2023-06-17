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
    nombre: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "nombre",
      autoIncrement: false
    },
    identificacion: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "identificacion",
      autoIncrement: false
    },
    direccion: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "direccion",
      autoIncrement: false
    },
    correo: {
      type: DataTypes.CHAR(200),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "correo",
      autoIncrement: false
    },
    telefono: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "telefono",
      autoIncrement: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_nacimiento",
      autoIncrement: false
    },
    fecha_vinculacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "fecha_vinculacion",
      autoIncrement: false
    },
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "genero_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "generos_model"
      }
    },
    tipo_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "tipo_usuario_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "tipo_usuarios_model"
      }
    },
    estado_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "estado_usuario_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "estado_usuarios_model"
      }
    }
  };
  const options = {
    tableName: "usuarios",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const UsuariosModel = sequelize.define("usuarios_model", attributes, options);

  UsuariosModel.associate = function (models) {
    UsuariosModel.belongsTo(models.generos_model, {
      foreignKey: 'genero_id',
      as: "genero"
    });

    UsuariosModel.belongsTo(models.tipo_usuarios_model, {
      foreignKey: 'tipo_usuario_id',
      as: "tipo"
    });

    UsuariosModel.belongsTo(models.estado_usuarios_model, {
      foreignKey: 'estado_usuario_id',
      as: "estado"
    });

    UsuariosModel.hasMany(models.estudiantes_model, {
      foreignKey: 'usuario_id',
      as: "user"
    });

    UsuariosModel.hasMany(models.coordinadors_model, {
      foreignKey: 'usuario_id',
      as: "userC"
    });
  };

  return UsuariosModel;
};