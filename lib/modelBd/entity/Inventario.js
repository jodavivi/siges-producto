const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
const Producto = require('./Producto');  

const Inventario = db.define('inventario', { 
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
    CodAlmacen          : Sequelize.STRING(4),
    Almacen             : Sequelize.STRING(64),
    MovimientoTipoCod   : Sequelize.STRING(16),
    MovimientoTipo      : Sequelize.STRING(64), 
    NumeroDocumento     : Sequelize.STRING(64),  
    Factor              : Sequelize.INTEGER,  
    ProductoId          :  {
                            type: Sequelize.INTEGER,
                            references: {
                            model: 'producto', // 'fathers' refers to table name
                            key: 'Id', // 'id' refers to column name in fathers table
                            }
                        }, 
    Cantidad            : Sequelize.FLOAT, 
    Moneda              : Sequelize.STRING(8),
    PrecioCostoTotal    : Sequelize.FLOAT , 
    CodEstadoInventario      : Sequelize.INTEGER,
    EstadoInventario        : Sequelize.STRING(64)
} 
,
{
    schema: "logistica"
});

Inventario.belongsTo(Producto, { as: "Producto",targetKey: 'Id',foreignKey: 'ProductoId' });   
Producto.hasOne(Inventario, { as: "Inventario",foreignKey: 'ProductoId' });

module.exports = Inventario;