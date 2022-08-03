const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

//db.createSchema("logistica").then(() => {
    // esquema para el producto
//});

const Categoria = db.define('categoria', { 
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
    Codigo              : Sequelize.STRING(16),
    Nombre              : Sequelize.STRING(128),
    Descripcion         : Sequelize.STRING(128),
    Padre               : Sequelize.STRING(512),
    PadreId             : Sequelize.INTEGER,
    Nivel               : Sequelize.INTEGER,
    Imagen              : Sequelize.STRING(128),
    Orden               : Sequelize.INTEGER, 
    CodEstadoCategoria  : Sequelize.INTEGER,
    EstadoCategoria     : Sequelize.STRING(64)
} 
,
{
    schema: "logistica",
});

 
module.exports = Categoria;