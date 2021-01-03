const productoRxDao		= require('../dao/ProductoRxDao'); 
const utils 		 	= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar los productos
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarProducto = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
 
		 var oFiltroProducto = {};
		 oFiltroProducto.iCategoriaId  = req.query.iCategoriaId;
		 oFiltroProducto.iMarcaId  	  = req.query.iMarcaId;
		 oFiltroProducto.sCodigo  	  = req.query.sCodigo;
		 oFiltroProducto.iId 	  	  = req.query.iId; 
		 var consultarProductoResponse =  await productoRxDao.consultarProducto(oFiltroProducto);
		 if(consultarProductoResponse.iCode !== 1){
			throw new Error(consultarProductoResponse.iCode + "||" + consultarProductoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarProductoResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 