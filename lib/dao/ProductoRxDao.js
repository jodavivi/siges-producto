const producto      = require('../modelBd/entity/Producto');    
const productoImagenModel = require('../modelBd/entity/ProductoImagen');
const categoriaModel = require('../modelBd/entity/Categoria');
const marcaModel = require('../modelBd/entity/Marca');
const productoPrecioModel = require('../modelBd/entity/ProductoPrecio');
const Op        = require('sequelize').Op;
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
        
        if(oFiltro.sCodEmpresa !== undefined){
            oFiltroLista.where.CodEmpresa  = oFiltro.sCodEmpresa; 
        } 
        if(oFiltro.iCategoriaId !== undefined){
            oFiltroLista.where.CategoriaId  = oFiltro.iCategoriaId; 
        } 
        if(oFiltro.iMarcaId !== undefined){
            oFiltroLista.where.MarcaId  = oFiltro.iMarcaId; 
        } 
        if(oFiltro.sCodigo !== undefined){
            oFiltroLista.where.Codigo  = oFiltro.sCodigo; 
        } 
        if(oFiltro.sCodigoBarra !== undefined){
            oFiltroLista.where.CodigoBarra  = oFiltro.sCodigoBarra; 
        } 
        
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }
        if(oFiltro.sNombre !== undefined){
            oFiltroLista.where.Nombre  = {
                [Op.iLike]: '%'+oFiltro.sNombre+'%'
            }; 
        }  
        if(oFiltro.sDescripcion !== undefined){
            oFiltroLista.where.Descripcion  = {
                [Op.iLike]: '%'+oFiltro.sDescripcion+'%'
            }; 
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
            ,required: false }  ,
            { model: productoPrecioModel, as: "ProductoPrecio", where: { EstadoId: 1 }
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