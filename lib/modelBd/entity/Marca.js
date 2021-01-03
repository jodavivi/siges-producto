const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Categoria = require('./Categoria');  

const Marca = db.define('marca', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    CategoriaId          : {
        type: Sequelize.INTEGER,
        references: {
        model: 'categoria', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    },
 
    Codigo       : Sequelize.STRING(16),
    Nombre       : Sequelize.STRING(64),
    Descripcion  : Sequelize.STRING(128),
    Imagen       : Sequelize.STRING(256),
    EstadoMarca  :  Sequelize.INTEGER
} 
,
{
    schema: "producto",
});

Categoria.hasMany(Marca, { as: "Marca",foreignKey: 'CategoriaId' }); 
Marca.belongsTo(Categoria, { as: "Categoria",targetKey: 'Id',foreignKey: 'CategoriaId' });  

module.exports = Marca;