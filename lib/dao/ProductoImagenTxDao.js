const productoImagen = require('../modelBd/entity/ProductoImagen'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite registrar imagen del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.registrarImagenProducto = async function (oParam) { 
    const oResponse = {};
    try {
        var seqProductoImagen = "'" +config.seqProductoImagen +"'";
        var seq = await utilsDao.obtenetSequencia(seqProductoImagen);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;
        oRegistro.ProductoId        = oParam.oData.iProductoId; 
        oRegistro.Imagen            = oParam.oData.sImagen;  
        oRegistro.Orden             = oParam.oData.iOrden;  
        oRegistro.CodEstadoImagen   = oParam.oData.iCodEstadoImagen;  
        oRegistro.EstadoImagen      = oParam.oData.sEstadoImagen;  
         
        const crearProductoImagenPromise = await productoImagen.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_imagen, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
      
    return oResponse; 
}
 

/**
 * @description Función que permite actualizar la imagen del producto 
 * @creation David Villanueva 27/04/2021
 * @update
 */
 exports.actualizarImagenProducto = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sImagen !== undefined){
            oRegistro.Imagen     = oParam.oData.sImagen; 
        }
        if(oParam.oData.iOrden !== undefined){
            oRegistro.Orden     = oParam.oData.iOrden; 
        }
        if(oParam.oData.iCodEstadoImagen !== undefined){
            oRegistro.CodEstadoImagen     = oParam.oData.iCodEstadoImagen; 
        }

        if(oParam.oData.sEstadoImagen !== undefined){
            oRegistro.EstadoImagen     = oParam.oData.sEstadoImagen; 
        } 
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await productoImagen.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_imagen, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar las imagenes del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.eliminarProductoImagen = async function (oParam) { 
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
        const acrualizarRegistroPromise = await productoImagen.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_imagen, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite eliminar las imagenes del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
 exports.eliminarImagenxproductoId = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.ProductoId = oParam.oData.iProductoId;
        const acrualizarRegistroPromise = await productoImagen.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_imagen, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}