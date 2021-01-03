const marca = require('../modelBd/entity/Marca'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear Marca 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.crearMarca = async function (oParam) { 
    const oResponse = {};
    try {
        var seqMarca = "'" +config.seqMarca +"'";
        var seq = await utilsDao.obtenetSequencia(seqMarca);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id               = parseInt(seq.oData, 10);
        oRegistro.EstadoId         = 1;
        oRegistro.UsuarioCreador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion = oParam.oAuditRequest.sTerminal; 
        oRegistro.CategoriaId      = oParam.oData.iCategoriaId;
        oRegistro.Codigo           = oParam.oData.sCodigo;
        oRegistro.Nombre           = oParam.oData.sNombre;
        oRegistro.Descripcion      = oParam.oData.sDescripcion;
        oRegistro.Imagen           = oParam.oData.sImagen;
        oRegistro.EstadoMarca      = oParam.oData.iEstadoMarca; 
        const crearRegistroPromise = await marca.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: marca, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Marca 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarMarca = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iCategoriaId !== undefined){
            oRegistro.CategoriaId     = oParam.oData.iCategoriaId; 
        }
        if(oParam.oData.sCodigo !== undefined){
            oRegistro.Codigo     = oParam.oData.sCodigo; 
        }
        if(oParam.oData.sNombre !== undefined){
            oRegistro.Nombre     = oParam.oData.sNombre; 
        }
        if(oParam.oData.sDescripcion !== undefined){
            oRegistro.Descripcion     = oParam.oData.sDescripcion; 
        }
        if(oParam.oData.sImagen !== undefined){
            oRegistro.Imagen     = oParam.oData.sImagen; 
        }
        if(oParam.oData.iEstadoMarca !== undefined){
            oRegistro.EstadoMarca     = oParam.oData.iEstadoMarca; 
        }
 
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await marca.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: marca, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Marca 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarMarca = async function (oParam) { 
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
        const acrualizarRegistroPromise = await marca.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: Marca, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}