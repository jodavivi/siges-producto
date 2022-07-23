const producto      = require('../modelBd/entity/Producto');    
const productoImagenModel = require('../modelBd/entity/ProductoImagen');
const categoriaModel = require('../modelBd/entity/Categoria');
const marcaModel = require('../modelBd/entity/Marca');
const Op        = require('Sequelize').Op;
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
        if(oFiltro.sBuscarProducto !== undefined
            && oFiltro.sBuscarProducto !== null
                && oFiltro.sBuscarProducto.length > 0){
                    oFiltroLista.where = { 
                    [Op.or]: [
                      {
                        Codigo: {
                          [Op.eq]: oFiltro.sBuscarProducto
                        }
                      },
                      {
                        Nombre: {
                            [Op.iLike]: '%'+oFiltro.sBuscarProducto+'%'
                        }
                      } 
                    ]
                  } 
        }
        oFiltroLista.where.EstadoId     = 1;   
        oFiltroLista.include = [
            { model: productoImagenModel, as: "ProductoImagen", where: { EstadoId: 1 }
            ,required: false },
            { model: categoriaModel, as: "Categoria", where: { EstadoId: 1 }
            ,required: false },
            { model: marcaModel, as: "Marca", where: { EstadoId: 1 }
            ,required: false }  
        ]
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