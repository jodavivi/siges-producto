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
    CodEmpresa          : Sequelize.STRING(4),
    Empresa             : Sequelize.STRING(64),
    Codigo              : Sequelize.STRING(16),
    Nombre              : Sequelize.STRING(64),
    Descripcion         : Sequelize.STRING(128),
    Imagen              : Sequelize.STRING(256),
    CodEstadoMarca      : Sequelize.INTEGER,
    EstadoMarca         : Sequelize.STRING(64)
} 
,
{
    schema: "logistica",
});
 

module.exports = Marca;