const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

const Categoria = require('./Categoria');  
const Marca = require('./Marca');  

const Producto = db.define('producto', { 
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
    CodEmpresa          : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    CategoriaId         :  {
                                type: Sequelize.INTEGER,
                                references: {
                                model: 'categoria', // 'fathers' refers to table name
                                key: 'Id', // 'id' refers to column name in fathers table
                                }
                            },
    MarcaId         :  {
                                type: Sequelize.INTEGER,
                                references: {
                                model: 'marca', // 'fathers' refers to table name
                                key: 'Id', // 'id' refers to column name in fathers table
                                }
                            },
    Codigo              : Sequelize.STRING(16),
    Nombre              : Sequelize.STRING(64),
    Descripcion         : Sequelize.STRING(128), 
    CodigoQr            : Sequelize.STRING(128),
    CodigoBarra         : Sequelize.STRING(64), 
    Presentacion        : Sequelize.STRING(64),
    Orden               : Sequelize.INTEGER,
    CodEstadoProducto   : Sequelize.INTEGER,
    EstadoProducto      : Sequelize.STRING(64)
} 
,
{
    schema: "logistica",
}); 

Producto.belongsTo(Categoria, { as: "Categoria",targetKey: 'Id',foreignKey: 'CategoriaId' });   
Categoria.hasOne(Producto, { as: "Producto",foreignKey: 'CategoriaId' });
Producto.belongsTo(Marca, { as: "Marca",targetKey: 'Id',foreignKey: 'MarcaId' });   
Marca.hasOne(Producto, { as: "Producto",foreignKey: 'MarcaId' });

module.exports = Producto;