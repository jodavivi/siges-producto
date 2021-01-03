const producto = require('../modelBd/entity/Producto'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear un producto 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.crearProducto = async function (oParam) { 
    const oResponse = {};
    try {
        var seqProducto = "'" +config.seqProducto +"'";
        var seq = await utilsDao.obtenetSequencia(seqProducto);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id               = parseInt(seq.oData, 10);
        oRegistro.EstadoId         = 1;
        oRegistro.UsuarioCreador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion = oParam.oAuditRequest.sTerminal;

        oRegistro.CategoriaId       = oParam.oData.iCategoriaId;
        oRegistro.MarcaId           = oParam.oData.iMarcaId;
        oRegistro.Codigo            = oParam.oData.sCodigo;
        oRegistro.Nombre            = oParam.oData.sNombre;
        oRegistro.Descripcion       = oParam.oData.sDescripcion;
        oRegistro.Imagen            = oParam.oData.sImagen;
        oRegistro.EstadoProducto    = oParam.oData.iEstadoProducto; 
         
        const crearRegistroPromise = await producto.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Producto 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarProducto = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iCategoriaId !== undefined){
            oRegistro.CategoriaId     = oParam.oData.iCategoriaId; 
        }
        if(oParam.oData.iMarcaId !== undefined){
            oRegistro.MarcaId     = oParam.oData.iMarcaId; 
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
        if(oParam.oData.iEstadoProducto !== undefined){
            oRegistro.EstadoProducto     = oParam.oData.iEstadoProducto; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await producto.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Producto 
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarProducto = async function (oParam) { 
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
        const acrualizarRegistroPromise = await producto.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}