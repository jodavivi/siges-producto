const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Marca = require('./Marca');   
const Categoria = require('./Categoria');   

const MarcaCategoria = db.define('marca_categoria', { 
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
    MarcaId          : {
        type: Sequelize.INTEGER,
        references: {
        model: 'marca', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    }, 
    CategoriaId       :  {
        type: Sequelize.INTEGER,
        references: {
        model: 'categoria', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    }
} 
,
{
    schema: "logistica",
    indexes: [
        // Create a unique index on poem
        {
          unique: true,
          fields: ['EstadoId','TransaccionId', 'CategoriaId', 'MarcaId']
        }]
});
 
Marca.hasMany(MarcaCategoria, { as: "MarcaCategoria",foreignKey: 'MarcaId' }); 
MarcaCategoria.belongsTo(Marca, { as: "Marca",targetKey: 'Id',foreignKey: 'MarcaId' });  

Categoria.hasOne(MarcaCategoria, { as: "MarcaCategoria",foreignKey: 'CategoriaId' }); 
MarcaCategoria.belongsTo(Categoria, { as: "Categoria",targetKey: 'Id',foreignKey: 'CategoriaId' });  

module.exports = MarcaCategoria; 