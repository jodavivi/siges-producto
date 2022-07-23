const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Producto = require('./Producto');  

const ProductoImagen = db.define('producto_imagen', { 
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
    ProductoId         :  {
        type: Sequelize.INTEGER,
        references: {
        model: 'producto', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    },
    Imagen              : Sequelize.STRING(256), 
    Orden               : Sequelize.INTEGER,
    CodEstadoImagen     : Sequelize.INTEGER,
    EstadoImagen        : Sequelize.STRING(64)
} 
,
{
    schema: "logistica",
}); 

ProductoImagen.belongsTo(Producto, { as: "Producto",targetKey: 'Id',foreignKey: 'ProductoId' });   
Producto.hasMany(ProductoImagen, { as: "ProductoImagen",foreignKey: 'ProductoId' }); 

module.exports = ProductoImagen;