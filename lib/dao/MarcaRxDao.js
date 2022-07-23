const marca = require('../modelBd/entity/Marca');   
const marcaCategoriaModel = require('../modelBd/entity/MarcaCategoria');
const Op        = require('Sequelize').Op;
const Sequelize =  require('sequelize');
/**
 * @description Función que permite consultar las marcas
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarMarca = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={};  
        if(oFiltro.sCodigo !== undefined){
            oFiltroLista.where.Codigo  = oFiltro.sCodigo; 
        } 
         
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id      = oFiltro.iId; 
        }  
        if(oFiltro.sBuscaMarca !== undefined
            && oFiltro.sBuscaMarca !== null
                && oFiltro.sBuscaMarca.length > 0){
                    oFiltroLista.where = { 
                    [Op.or]: [
                      {
                        Codigo: {
                          [Op.eq]: oFiltro.sBuscaMarca
                        }
                      },
                      {
                        Nombre: {
                            [Op.iLike]: Sequelize.fn('lower', '%'+oFiltro.sBuscaMarca+'%')
                        }
                      } 
                    ]
                  } 
        }
        oFiltroLista.where.EstadoId    = 1;   
        oFiltroLista.include = [
            { model: marcaCategoriaModel, as: "MarcaCategoria", where: { EstadoId: 1 }
            ,required: false } 
        ]
        const consultarListaResponse = await  marca.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de Marcas'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla:  Configuración de Marcas, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}