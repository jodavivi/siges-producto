const marcaCategoria      = require('../modelBd/entity/MarcaCategoria');    
const categoriaModel      = require('../modelBd/entity/Categoria');
const vista = require('../modelBd/view/VMarcaCategoria.json');
const db = require('../config/db');
const Sequelize =  require('sequelize');
/**
 * @description Función que permite consultar las categorias por marca
 * @creation David Villanueva 15/04/2021
 * @update
 */
exports.consultarMarcaCategoria = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={};  
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
        oFiltroLista.include = [
            { model: categoriaModel, as: "Categoria", where: { EstadoId: 1 }
            ,required: false } 
        ]
        const consultarListaResponse = await  marcaCategoria.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de categorias por marca'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: marcaCategoria, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}


/**
 * @description Función que permite consultar las marcas por categoria
 * @creation David Villanueva 25/04/2021
 * @update
 */
 exports.consultarCategoriaxMarca = async function (oParam) { 
    const oResponse = {};
    var aFiltro     = [];
    try {
        var query = vista.viewMarcaCategoria;
        query = query + ' and  mc."CategoriaId" =  ?';
        
        aFiltro.push(oParam.iCategoriaId); 

        var aLista = await db.query(query, { 
            replacements: aFiltro,
            type: Sequelize.QueryTypes.SELECT
           });
        if(aLista.length === 0){
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'Marca no encontrado';
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
