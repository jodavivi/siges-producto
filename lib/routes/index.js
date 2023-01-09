const express = require('express');
const router = express.Router();

const categoriaRxBusiness        = require('../business/CategoriaRxBusiness');  
const categoriaTxBusiness        = require('../business/CategoriaTxBusiness'); 
const marcaRxBusiness            = require('../business/MarcaRxBusiness');  
const marcaTxBusiness            = require('../business/MarcaTxBusiness');   
const productoRxBusiness         = require('../business/ProductoRxBusiness');  
const productoTxBusiness         = require('../business/ProductoTxBusiness');  
const marcaCategoriaRxBusiness   = require('../business/MarcaCategoriaRxBusiness');  
const marcaCategoriaTxBusiness   = require('../business/MarcaCategoriaTxBusiness');  
const productoImagenRxBusiness   = require('../business/ProductoImagenRxBusiness'); 
const productoImagenTxBusiness   = require('../business/ProductoImagenTxBusiness');  
const inventarioRxBusiness        = require('../business/InventarioRxBusiness');  
const inventarioTxBusiness        = require('../business/InventarioTxBusiness');  

module.exports = function(){

    //categoria
    router.post('/categoria', categoriaTxBusiness.registrarCategoria); 
    router.put('/categoria', categoriaTxBusiness.actualizarCategoria); 
    router.delete('/categoria', categoriaTxBusiness.eliminarCategoria);  
    router.get('/categoria', categoriaRxBusiness.consultarCategoria); 

    //marca
    router.get('/marca', marcaRxBusiness.consultarMarca);  
    router.post('/marca', marcaTxBusiness.registrarMarca);  
    router.put('/marca', marcaTxBusiness.actualizarMarca);  
    router.delete('/marca', marcaTxBusiness.eliminarMarca);  
    
    //marca_categoria
    router.get('/marca/categoria', marcaCategoriaRxBusiness.consultarMarcaCategoria); 
    router.get('/marca/categoria/filtro', marcaCategoriaRxBusiness.consultarCategoriaxMarca); 
    router.post('/marca/categoria', marcaCategoriaTxBusiness.registrarMarcaCategoria);  
    router.put('/marca/categoria', marcaCategoriaTxBusiness.actualizarMarcaCategoria);  
    router.delete('/marca/categoria', marcaCategoriaTxBusiness.eliminarMarcaCategoria);  


    //producto
    router.get('/', productoRxBusiness.consultarProducto); 
    router.post('/', productoTxBusiness.registrarProducto); 
    router.put('/', productoTxBusiness.actualizarProducto); 
    router.delete('/', productoTxBusiness.eliminarProducto);  
    
    //producto_imagen
    router.get('/imagen', productoImagenRxBusiness.consultarImagenProducto); 
    router.post('/imagen', productoImagenTxBusiness.registrarImagenProducto);  
    router.put('/imagen', productoImagenTxBusiness.actualizarImagenProducto); 
    router.delete('/imagen', productoImagenTxBusiness.eliminarImagenProducto);  

     //Inventario
     router.post('/inventario', inventarioTxBusiness.registrarInventario); 
     router.put('/inventario/:id', inventarioTxBusiness.actualizarInventario); 
     router.delete('/inventario', inventarioTxBusiness.eliminarInventario);  
     router.get('/inventario', inventarioRxBusiness.consultarInventario); 
     router.get('/inventario/disponibilidad', inventarioRxBusiness.consultarDisponibilidadProducto); 

    return router;
}

