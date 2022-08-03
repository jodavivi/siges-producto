const inventario = require('../modelBd/entity/Inventario');   
const vista = require('../modelBd/view/VProductoDisponible.json');
const db = require('../config/db');
const Sequelize =  require('sequelize');

/**
 * @description Función que permite consultar los inventarios
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.consultarInventario = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sNumeroDocumento !== undefined){
            oFiltroLista.where.NumeroDocumento  = oFiltro.sNumeroDocumento; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        const consultarListaResponse = await  inventario.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de inventario'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: inventario, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}



/**
 * @description Función que permite consultar la disponibilidad de productos
 * @creation David Villanueva 02/08/2022
 * @update
 */
 exports.consultarDisponibilidadProducto = async function (oParam) { 
    const oResponse = {};
    var aFiltro     = [];
    try {
        var query = vista.viewProductoDisponible;
       
        if(oParam.sCodEmpresa !== undefined){ 
            query = query + ' where  ip."CodEmpresa" =  ?';
            aFiltro.push(oParam.sCodEmpresa); 
        } 
        if(oParam.sCodSede !== undefined){ 
            query = query + ' and  ip."CodSede" =  ?';
            aFiltro.push(oParam.sCodSede); 
        } 
        if(oParam.sCodAlmacen !== undefined){ 
            query = query + ' and  ip."CodAlmacen" =  ?';
            aFiltro.push(oParam.sCodAlmacen); 
        } 
        if(oParam.aProductoId !== undefined){ 
            query = query + ' and  ip."ProductoId" in  (?)';
            aFiltro.push(oParam.aProductoId); 
        } 
        

        var aLista = await db.query(query, { 
            replacements: aFiltro,
            type: Sequelize.QueryTypes.SELECT
           });
        if(aLista.length === 0){
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'Inventario de producto no encontrado';
        }else{
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK';
            oResponse.oData     = aLista;
        }
        
    } catch (e) { 
        console.log(e);
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la consulta, error: '+ e.message+ ", Ubicación: " + e.stack.split("\n")[1].replace("    at ", "");
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}