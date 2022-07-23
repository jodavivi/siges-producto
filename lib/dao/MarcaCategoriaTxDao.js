const marcaCategoria = require('../modelBd/entity/MarcaCategoria'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite registrar una categoria a la marca
 * @creation David Villanueva 18/04/2021
 * @update
 */
exports.crearMarcaCategoria = async function (oParam) { 
    const oResponse = {};
    try {
        var seqMarcaCategoria = "'" +config.seqMarcaCategoria +"'";
        var seq = await utilsDao.obtenetSequencia(seqMarcaCategoria);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        oRegistro.MarcaId           = oParam.oData.iMarcaId; 
        oRegistro.CategoriaId       = oParam.oData.iCategoriaId;  
         
        const crearMarcaCategoriaPromise = await marcaCategoria.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: marca_categoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
      
    return oResponse; 
}
 
/**
 * @description Función que permite eliminar las categorias de las marcas 
 * @creation David Villanueva 18/04/2021
 * @update
 */
exports.eliminarMarcaCategoria = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await marcaCategoria.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: marca_categoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}