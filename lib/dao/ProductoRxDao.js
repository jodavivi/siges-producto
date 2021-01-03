const producto      = require('../modelBd/entity/Producto');    

/**
 * @description Función que permite consultar los productos
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarProducto = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iCategoriaId !== undefined){
            oFiltroLista.where.CategoriaId  = oFiltro.iCategoriaId; 
        } 
        if(oFiltro.iMarcaId !== undefined){
            oFiltroLista.where.MarcaId  = oFiltro.iMarcaId; 
        } 
        if(oFiltro.sCodigo !== undefined){
            oFiltroLista.where.Codigo  = oFiltro.sCodigo; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
 
        const consultarListaResponse = await  producto.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de productos'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: producto, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}