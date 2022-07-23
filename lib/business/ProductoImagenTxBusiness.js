const productoImagenTxDao	 = require('../dao/ProductoImagenTxDao');  
const utils 	     	 	 = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar la imagen del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.registrarImagenProducto = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos imagen de producto
		 var oRegistroArea = {};
		 oRegistroArea.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroArea.oData		  = oRequest.oData; 
		 const registrarImagenProductoResponse = await  productoImagenTxDao.registrarImagenProducto(oRegistroArea);
		 if(registrarImagenProductoResponse.iCode !== 1){
			throw new Error(registrarImagenProductoResponse.iCode + "||" + registrarImagenProductoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= registrarImagenProductoResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar la imagen del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.actualizarImagenProducto = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		//actualizamos Area
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.query.iId, 10); 
		const actualizarCategoriaResponse = await  productoImagenTxDao.actualizarImagenProducto(oRegistro);
		if(actualizarCategoriaResponse.iCode !== 1){
		   throw new Error(actualizarCategoriaResponse.iCode + "||" + actualizarCategoriaResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarCategoriaResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar la imagen del producto
 * @creation David Villanueva 27/04/2021
 * @update
 */
exports.eliminarImagenProducto = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarProductoImagenResponse = await  productoImagenTxDao.eliminarProductoImagen(oRegistro);
			if(eliminarProductoImagenResponse.iCode !== 1){
				throw new Error(eliminarProductoImagenResponse.iCode + "||" + eliminarProductoImagenResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

