const categoria = require('../modelBd/entity/Categoria');  
const Op        = require('Sequelize').Op;

/**
 * @description Función que permite consultar las categorias
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarCategoria = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sCodigo !== undefined){
            oFiltroLista.where.Codigo  = oFiltro.sCodigo; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        if(oFiltro.iCodEstadoCategoria !== undefined){
            oFiltroLista.where.CodEstadoCategoria  = oFiltro.iCodEstadoCategoria; 
        } 
        
        if(oFiltro.sBuscaCategoria !== undefined
            && oFiltro.sBuscaCategoria !== null
                && oFiltro.sBuscaCategoria.length > 0){
                    oFiltroLista.where = { 
                    [Op.or]: [
                      {
                        Codigo: {
                          [Op.eq]: oFiltro.sBuscaCategoria
                        }
                      },
                      {
                        Nombre: {
                            [Op.iLike]: '%'+oFiltro.sBuscaCategoria+'%'
                        }
                      } 
                    ]
                  } 
        }
        oFiltroLista.where.EstadoId     = 1; 
        const consultarListaResponse = await  categoria.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de la categoria'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: categoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}
