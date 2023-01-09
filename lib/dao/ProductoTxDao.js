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
        oRegistro.Codigo            = utilsGen.generarCodigo(seq.oData,5,"PR");
        oRegistro.Nombre            = oParam.oData.sNombre;
        oRegistro.Descripcion       = oParam.oData.sDescripcion; 
        oRegistro.CodigoQr          = oParam.oData.sCodigoQr; 
        oRegistro.CodigoBarra       = oParam.oData.sCodigoBarra; 
        oRegistro.CodPresentacion   = oParam.oData.sCodPresentacion; 
        oRegistro.Presentacion      = oParam.oData.sPresentacion;
        oRegistro.UnidadMedida      = oParam.oData.sUnidadMedida;
        oRegistro.Orden             = oParam.oData.iOrden; 
        oRegistro.CodEmpresa        = oParam.oData.sCodEmpresa;
        oRegistro.Empresa           = oParam.oData.sEmpresa; 
        oRegistro.CodEstadoProducto = oParam.oData.iCodEstadoProducto;
        oRegistro.EstadoProducto    = oParam.oData.sEstadoProducto; 
         
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
        if(oParam.oData.sNombre !== undefined){
            oRegistro.Nombre     = oParam.oData.sNombre; 
        }
        if(oParam.oData.sDescripcion !== undefined){
            oRegistro.Descripcion     = oParam.oData.sDescripcion; 
        }
        if(oParam.oData.sCodigoQr !== undefined){
            oRegistro.CodigoQr     = oParam.oData.sCodigoQr; 
        }
        if(oParam.oData.sCodigoBarra !== undefined){
            oRegistro.CodigoBarra     = oParam.oData.sCodigoBarra; 
        }
        if(oParam.oData.sCodPresentacion !== undefined){
            oRegistro.CodPresentacion     = oParam.oData.sCodPresentacion; 
        }
        if(oParam.oData.sPresentacion !== undefined){
            oRegistro.Presentacion     = oParam.oData.sPresentacion; 
        }
        if(oParam.oData.sUnidadMedida !== undefined){
            oRegistro.UnidadMedida     = oParam.oData.sUnidadMedida; 
        }
        if(oParam.oData.iOrden !== undefined){
            oRegistro.Orden     = oParam.oData.iOrden; 
        } 
        if(oParam.oData.iCodEstadoProducto !== undefined){
            oRegistro.CodEstadoProducto     = oParam.oData.iCodEstadoProducto; 
        }
        if(oParam.oData.sEstadoProducto !== undefined){
            oRegistro.EstadoProducto     = oParam.oData.sEstadoProducto; 
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