const productoPrecio = require('../modelBd/entity/ProductoPrecio'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite registrar el precio del producto
 * @creation David Villanueva 09/01/2023
 * @update
 */
exports.registrarProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
        var seqProductoPrecio = "'" +config.seqProductoPrecio +"'";
        var seq = await utilsDao.obtenetSequencia(seqProductoPrecio);
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
        oRegistro.CodEmpresa        = oParam.oData.sCodEmpresa;  
        oRegistro.Empresa           = oParam.oData.sEmpresa;  
        oRegistro.CodSede           = oParam.oData.sCodSede;  
        oRegistro.Sede              = oParam.oData.sSede;   
        oRegistro.Moneda              = oParam.oData.sMoneda;  
        oRegistro.PrecioCosto         = oParam.oData.fPrecioCosto;  
        oRegistro.Impuesto            = oParam.oData.fImpuesto;  
        oRegistro.MargenGanancia      = oParam.oData.fMargenGanancia;  
        oRegistro.PrecioVenta         = oParam.oData.fPrecioVenta;   
        oRegistro.CodEstadoPrecio     = oParam.oData.iCodEstadoPrecio;  
        oRegistro.EstadoPrecio        = oParam.oData.sEstadoPrecio;  
         
        const crearProductoPrecioPromise = await productoPrecio.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
      
    return oResponse; 
}
 

/**
 * @description Función que permite actualizar el precio del producto
 * @creation David Villanueva 09/01/2023
 * @update
 */
 exports.actualizarProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.sMoneda !== undefined){
            oRegistro.Moneda     = oParam.oData.sMoneda; 
        }
        if(oParam.oData.fPrecioCosto !== undefined){
            oRegistro.PrecioCosto     = oParam.oData.fPrecioCosto; 
        }
        if(oParam.oData.fImpuesto !== undefined){
            oRegistro.Impuesto     = oParam.oData.fImpuesto; 
        }

        if(oParam.oData.fMargenGanancia !== undefined){
            oRegistro.MargenGanancia     = oParam.oData.fMargenGanancia; 
        } 

        if(oParam.oData.fPrecioVenta !== undefined){
            oRegistro.PrecioVenta     = oParam.oData.fPrecioVenta; 
        } 
        if(oParam.oData.iCodEstadoPrecio !== undefined){
            oRegistro.CodEstadoPrecio     = oParam.oData.iCodEstadoPrecio; 
        } 
        if(oParam.oData.sEstadoPrecio !== undefined){
            oRegistro.EstadoPrecio     = oParam.oData.sEstadoPrecio; 
        } 

        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await productoPrecio.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar los precios del producto
 * @creation David Villanueva 09/01/2023
 * @update
 */
exports.eliminarProductoPrecio = async function (oParam) { 
    const oResponse = {};
    try {
 
        //Eliminamos el precio del producto
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await productoPrecio.update(oRegistro, oFiltro);



        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto_precio, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite eliminar las imagenes del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
 exports.eliminarPrecioxproductoId = async function (oParam) { 
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
        oFiltro.where.EstadoId = 1;
        const acrualizarRegistroPromise = await productoPrecio.update(oRegistro, oFiltro);
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