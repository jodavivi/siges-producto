const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Producto = require('./Producto');  

const ProductoPrecio = db.define('producto_precio', { 
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
    CodSede             : Sequelize.STRING(4),
    Sede                : Sequelize.STRING(64),
    ProductoId         :  {
        type: Sequelize.INTEGER,
        references: {
        model: 'producto', // 'fathers' refers to table name
        key: 'Id', // 'id' refers to column name in fathers table
        }
    },
    Moneda              : Sequelize.STRING(8), 
    PrecioCosto         : Sequelize.FLOAT,
    Impuesto            : Sequelize.FLOAT,
    MargenGanancia      : Sequelize.FLOAT,
    PrecioVenta         : Sequelize.FLOAT,
    CodEstadoPrecio     : Sequelize.INTEGER,
    EstadoPrecio        : Sequelize.STRING(64)
} 
,
{
    schema: "logistica",
}); 

ProductoPrecio.belongsTo(Producto, { as: "Producto",targetKey: 'Id',foreignKey: 'ProductoId' });   
Producto.hasMany(ProductoPrecio, { as: "ProductoPrecio",foreignKey: 'ProductoId' }); 

module.exports = ProductoPrecio;