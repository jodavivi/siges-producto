const productoTxDao	 	 = require('../dao/ProductoTxDao');  
const utils 	     	 = require('../utils/utils');  
const productoImagenTxDao = require('../dao/ProductoImagenTxDao');  

/**
 * @description Función que permite registrar producto
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.registrarProducto = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos peroducto
		 var oRegistroProducto = {};
		 oRegistroProducto.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroProducto.oData		  = oRequest.oData; 
		 const crearProductoResponse = await  productoTxDao.crearProducto(oRegistroProducto);
		 if(crearProductoResponse.iCode !== 1){
			throw new Error(crearProductoResponse.iCode + "||" + crearProductoResponse.sMessage);
		 }
		 var oProducto = crearProductoResponse.oData;
 
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= oProducto;
		
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
 * @description Función que permite actualizar producto
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarProducto = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
	 
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.query.iId, 10); 
		const actualizarProductoResponse = await  productoTxDao.actualizarProducto(oRegistro);
		if(actualizarProductoResponse.iCode !== 1){
		   throw new Error(actualizarProductoResponse.iCode + "||" + actualizarProductoResponse.sMessage);
		}
 
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarProductoResponse.oData; 
	   
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
 * @description Función que permite eliminar producto
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarProducto = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			
			//Eliminamos el producto
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarProductoResponse = await  productoTxDao.eliminarProducto(oRegistro);
			if(eliminarProductoResponse.iCode !== 1){
				throw new Error(eliminarProductoResponse.iCode + "||" + eliminarProductoResponse.sMessage);
			} 
 
			// Eliminamos las imagenes del producto
			var oImagen = {};
			oImagen.oAuditRequest  	  = oRequest.oAuditRequest;
			oImagen.oData		  	  = {}; 
			oImagen.oData.iProductoId = parseInt(e, 10); 
			var eliminarImagenxproductoIdResponse = productoImagenTxDao.eliminarImagenxproductoId(oImagen);
			if(eliminarImagenxproductoIdResponse.iCode !== 1){
				throw new Error(eliminarImagenxproductoIdResponse.iCode + "||" + eliminarImagenxproductoIdResponse.sMessage);
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

