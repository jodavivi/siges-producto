const categoria = require('../modelBd/entity/Categoria'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear una categoria 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.crearCategoria = async function (oParam) { 
    const oResponse = {};
    try {
        var seqCategoria = "'" +config.seqCategoria +"'";
        var seq = await utilsDao.obtenetSequencia(seqCategoria);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        oRegistro.Codigo            = oParam.oData.sCodigo;
        oRegistro.Nombre            = oParam.oData.sNombre;
        oRegistro.Descripcion       = oParam.oData.sDescripcion;
        oRegistro.Padre             = oParam.oData.sPadre;
        oRegistro.Nivel             = oParam.oData.iNivel;
        oRegistro.Imagen            = oParam.oData.sImagen;
        oRegistro.Orden             = oParam.oData.iOrden;
        oRegistro.EstadoCategoria   = oParam.oData.iEstadoCategoria; 
         
        const crearRegistroPromise = await categoria.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: categoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Categoria 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarCategoria = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sCodigo !== undefined){
            oRegistro.Codigo     = oParam.oData.sCodigo; 
        }
        if(oParam.oData.sNombre !== undefined){
            oRegistro.Nombre     = oParam.oData.sNombre; 
        }
        if(oParam.oData.sDescripcion !== undefined){
            oRegistro.Descripcion     = oParam.oData.sDescripcion; 
        }
        if(oParam.oData.sPadre !== undefined){
            oRegistro.Padre     = oParam.oData.sPadre; 
        }
        if(oParam.oData.iNivel !== undefined){
            oRegistro.Nivel     = oParam.oData.iNivel; 
        }
        if(oParam.oData.sImagen !== undefined){
            oRegistro.Imagen     = oParam.oData.sImagen; 
        }
        if(oParam.oData.iOrden !== undefined){
            oRegistro.Orden     = oParam.oData.iOrden; 
        }
        if(oParam.oData.iEstadoCategoria !== undefined){
            oRegistro.EstadoCategoria     = oParam.oData.iEstadoCategoria; 
        }
       
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await categoria.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: categoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Categoria 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarCategoria = async function (oParam) { 
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
        const acrualizarRegistroPromise = await categoria.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: categoria, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}