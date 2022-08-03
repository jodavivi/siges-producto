const inventario = require('../modelBd/entity/Inventario'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear un inventario
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.crearInventario = async function (oParam) { 
    const oResponse = {};
    try {
        var seqInventario = "'" +config.seqInventario +"'";
        var seq = await utilsDao.obtenetSequencia(seqInventario);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.CodEmpresa            = oParam.oData.sCodEmpresa;
        oRegistro.Empresa              = oParam.oData.sEmpresa;
        oRegistro.CodSede                = oParam.oData.sCodSede;
        oRegistro.Sede                  = oParam.oData.sSede;
        oRegistro.CodAlmacen             = oParam.oData.sCodAlmacen;
        oRegistro.Almacen               = oParam.oData.sAlmacen;
        oRegistro.MovimientoTipoCod     = oParam.oData.sMovimientoTipoCod;
        oRegistro.MovimientoTipo        = oParam.oData.sMovimientoTipo;
        oRegistro.NumeroDocumento       = oParam.oData.sNumeroDocumento; 
        oRegistro.ProductoCod           = oParam.oData.sProductoCod;
        oRegistro.ProductoCodBarra      = oParam.oData.sProductoCodBarra;
        oRegistro.Producto              = oParam.oData.sProducto;
        oRegistro.Cantidad              = oParam.oData.fCantidad;
        oRegistro.PrecioCostoTotal      = oParam.oData.fPrecioCostoTotal;     
        const crearRegistroPromise = await inventario.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: inventario, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar el Inventario 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.actualizarInventario = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        
        if(oParam.oData.sCodSede !== undefined){
            oRegistro.CodSede     = oParam.oData.sCodSede; 
        }
        if(oParam.oData.sSede !== undefined){
            oRegistro.Sede     = oParam.oData.sSede; 
        }
        if(oParam.oData.sCodAlmacen !== undefined){
            oRegistro.CodAlmacen     = oParam.oData.sCodAlmacen; 
        }
        if(oParam.oData.sMovimientoTipoCod !== undefined){
            oRegistro.MovimientoTipoCod     = oParam.oData.sMovimientoTipoCod; 
        }
        if(oParam.oData.sMovimientoTipo !== undefined){
            oRegistro.MovimientoTipo     = oParam.oData.sMovimientoTipo; 
        }
        if(oParam.oData.sNumeroDocumento !== undefined){
            oRegistro.NumeroDocumento     = oParam.oData.sNumeroDocumento; 
        } 
        if(oParam.oData.sProductoCod !== undefined){
            oRegistro.ProductoCod     = oParam.oData.sProductoCod; 
        }
        if(oParam.oData.sProductoCodBarra !== undefined){
            oRegistro.ProductoCodBarra     = oParam.oData.sProductoCodBarra; 
        }
        if(oParam.oData.sProducto !== undefined){
            oRegistro.Producto     = oParam.oData.sProducto; 
        }
        if(oParam.oData.fCantidad !== undefined){
            oRegistro.Cantidad     = oParam.oData.fCantidad; 
        }
        if(oParam.oData.fPrecioCostoTotal !== undefined){
            oRegistro.PrecioCostoTotal     = oParam.oData.fPrecioCostoTotal; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await inventario.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: inventario, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Inventario 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.eliminarInventario = async function (oParam) { 
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
        const acrualizarRegistroPromise = await inventario.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: inventario, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}