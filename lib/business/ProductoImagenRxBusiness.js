const productoImagenRxDao	= require('../dao/ProductoImagenRxDao'); 
const utils 		 		= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las imagenes por producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.consultarImagenProducto = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
 
		 var oFiltroProducto = {};  
		 oFiltroProducto.iProductoId  	  	= req.query.iProductoId;
		 oFiltroProducto.iCodEstadoImagen 	= req.query.iCodEstadoImagen; 
		 oFiltroProducto.iId 	  	  		= req.query.iId; 
		 var consultarImagenProductoResponse =  await productoImagenRxDao.consultarImagenProducto(oFiltroProducto);
		 if(consultarImagenProductoResponse.iCode !== 1){
			throw new Error(consultarImagenProductoResponse.iCode + "||" + consultarImagenProductoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarImagenProductoResponse.oData;
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
  