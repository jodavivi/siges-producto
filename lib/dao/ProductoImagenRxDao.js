const productoImagen      = require('../modelBd/entity/ProductoImagen');    
/**
 * @description Función que permite consultar las imagenes por producto
 * @creation David Villanueva 15/04/2021
 * @update
 */
exports.consultarImagenProducto = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={};  
        if(oFiltro.iProductoId !== undefined){
            oFiltroLista.where.ProductoId  = oFiltro.iProductoId; 
        } 
        if(oFiltro.iCodEstadoImagen !== undefined){
            oFiltroLista.where.CodEstadoImagen  = oFiltro.iCodEstadoImagen; 
        }  
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;   
        const consultarListaResponse = await  productoImagen.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de imagenes por marca'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: ProductoImagen, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}

 