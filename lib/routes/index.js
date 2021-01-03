const express = require('express');
const router = express.Router();

const categoriaRxBusiness        = require('../business/CategoriaRxBusiness');  
const categoriaTxBusiness        = require('../business/CategoriaTxBusiness'); 
const marcaRxBusiness            = require('../business/MarcaRxBusiness');  
const marcaTxBusiness            = require('../business/MarcaTxBusiness');   
const productoRxBusiness         = require('../business/ProductoRxBusiness');  
const productoTxBusiness         = require('../business/ProductoTxBusiness');   


module.exports = function(){

    //categoria
    router.post('/categoria', categoriaTxBusiness.registrarCategoria); 
    router.put('/categoria/:id', categoriaTxBusiness.actualizarCategoria); 
    router.delete('/categoria', categoriaTxBusiness.eliminarCategoria);  
    router.get('/categoria', categoriaRxBusiness.consultarCategoria); 

    //marca
    router.post('/marca', marcaTxBusiness.registrarMarca); 
    router.put('/marca/:id', marcaTxBusiness.actualizarMarca); 
    router.delete('/marca', marcaTxBusiness.eliminarMarca);  
    router.get('/marca', marcaRxBusiness.consultarMarca); 

    //producto
    router.post('/', productoTxBusiness.registrarProducto); 
    router.put('/:id', productoTxBusiness.actualizarProducto); 
    router.delete('/', productoTxBusiness.eliminarProducto);  
    router.get('/', productoRxBusiness.consultarProducto); 
 
    
    return router;
}

