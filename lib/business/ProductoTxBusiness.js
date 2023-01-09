const productoTxDao	 	 = require('../dao/ProductoTxDao');  
const productoRxDao	 	 = require('../dao/ProductoRxDao');  
const utils 	     	 = require('../utils/utils');  
const productoImagenTxDao = require('../dao/ProductoImagenTxDao'); 
const productoPrecioTxDao = require('../dao/ProductoPrecioTxDao');  

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
		 var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);

		 //COnsultamos producto
		var oFiltroProducto = {};
		oFiltroProducto.sCodEmpresa = oEmpresa.CodEmpresa;
		oFiltroProducto.sNombre = oRequest.oData.sNombre;
		oFiltroProducto.sCodigoBarra= oRequest.oData.sCodigoBarra;
		const consultarProductoDuplicadoResponse = await   productoRxDao.consultarProductoDuplicado(oFiltroProducto);
		if(consultarProductoDuplicadoResponse.iCode === 1){
			throw new Error(102 + "||" + "Ya existe el producto");
		 }
		//Registramos peroducto
		 var oRegistroProducto = {};
		 oRegistroProducto.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroProducto.oData		  = oRequest.oData;  
		 oRegistroProducto.oData.sCodEmpresa = oEmpresa.CodEmpresa;
		 oRegistroProducto.oData.sEmpresa = oEmpresa.RazonSocial;
		 const crearProductoResponse = await  productoTxDao.crearProducto(oRegistroProducto);
		 if(crearProductoResponse.iCode !== 1){
			throw new Error(crearProductoResponse.iCode + "||" + crearProductoResponse.sMessage);
		 }
		 var oProducto = crearProductoResponse.oData; 
		 //Registramos las imagenes
		 if(oRequest.oData.aImagen){
			oRequest.oData.aImagen.forEach(async function(e){
				var oRegistroImagen = {};
				oRegistroImagen.oAuditRequest  = oRequest.oAuditRequest;
				oRegistroImagen.oData          = {};
				oRegistroImagen.oData.iProductoId    = oProducto.Id;
				oRegistroImagen.oData.sImagen        = e.sImagen;  
				oRegistroImagen.oData.iOrden		   = e.iOrden;  
				oRegistroImagen.oData.iCodEstadoImagen = e.iCodEstadoImagen; 
				oRegistroImagen.oData.sEstadoImagen    = e.sEstadoImagen;          
				const registrarImagenProductoResponse = await productoImagenTxDao.registrarImagenProducto(oRegistroImagen);
				if(registrarImagenProductoResponse.iCode !== 1){
					throw new Error(registrarImagenProductoResponse.iCode + "||" + registrarImagenProductoResponse.sMessage);
				 }
			});
		 }

		 //Registramos el precio 
		if(oRequest.oData.aPrecio){
			oRequest.oData.aPrecio.forEach(async function(e){
				var oRegistroPrecio = {};
				oRegistroPrecio.oAuditRequest  = oRequest.oAuditRequest;
				oRegistroPrecio.oData          		= {};
				oRegistroPrecio.oData.iProductoId   = oProducto.Id;
				oRegistroPrecio.oData.sCodEmpresa   = oEmpresa.CodEmpresa;
				oRegistroPrecio.oData.sEmpresa		= oEmpresa.RazonSocial;
				oRegistroPrecio.oData.sCodSede 		= e.sCodSede; 
				oRegistroPrecio.oData.sSede    		= e.sSede;      
				oRegistroPrecio.oData.sMoneda    	= e.sMoneda;          
				oRegistroPrecio.oData.fPrecioCosto  = e.fPrecioCosto;          
				oRegistroPrecio.oData.fImpuesto     = e.fImpuesto;          
				oRegistroPrecio.oData.fMargenGanancia = e.fMargenGanancia;          
				oRegistroPrecio.oData.fPrecioVenta    = e.fPrecioVenta;     
				oRegistroPrecio.oData.iCodEstadoPrecio = e.iCodEstadoPrecio; 
				oRegistroPrecio.oData.sEstadoPrecio    = e.sEstadoPrecio;      
				const registrarProductoPrecioResponse = await productoPrecioTxDao.registrarProductoPrecio(oRegistroPrecio);
				if(registrarProductoPrecioResponse.iCode !== 1){
					throw new Error(registrarProductoPrecioResponse.iCode + "||" + registrarProductoPrecioResponse.sMessage);
				 }
			});
		 }
 
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
		var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.query.iId, 10); 
		const actualizarProductoResponse = await  productoTxDao.actualizarProducto(oRegistro);
		if(actualizarProductoResponse.iCode !== 1){
		   throw new Error(actualizarProductoResponse.iCode + "||" + actualizarProductoResponse.sMessage);
		}
		//Actualizamos la imagen
		 if(oRequest.oData.aImagen){
			oRequest.oData.aImagen.forEach(async function(e){
				if(e.sAccion === "C"){
					var oRegistroImagen = {};
					oRegistroImagen.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroImagen.oData          = {};
					oRegistroImagen.oData.iProductoId    = parseInt(req.query.iId, 10); 
					oRegistroImagen.oData.sImagen        = e.sImagen;  
					oRegistroImagen.oData.iOrden		   = e.iOrden;  
					oRegistroImagen.oData.iCodEstadoImagen = e.iCodEstadoImagen; 
					oRegistroImagen.oData.sEstadoImagen    = e.sEstadoImagen;          
					const registrarImagenProductoResponse = await productoImagenTxDao.registrarImagenProducto(oRegistroImagen);
					if(registrarImagenProductoResponse.iCode !== 1){
						throw new Error(registrarImagenProductoResponse.iCode + "||" + registrarImagenProductoResponse.sMessage);
					}
				} 
				if(e.sAccion === "U"){
					var oActualizarImagen = {};
					oActualizarImagen.oAuditRequest  = oRequest.oAuditRequest;
					oActualizarImagen.oData          = {};
					oActualizarImagen.oData.iId			 = e.iId; 
					oActualizarImagen.oData.sImagen        = e.sImagen;  
					oActualizarImagen.oData.iOrden		   = e.iOrden;  
					oActualizarImagen.oData.iCodEstadoImagen = e.iCodEstadoImagen; 
					oActualizarImagen.oData.sEstadoImagen    = e.sEstadoImagen;          
					const actualizarImagenProductoResponse = await productoImagenTxDao.actualizarImagenProducto(oActualizarImagen);
					if(actualizarImagenProductoResponse.iCode !== 1){
						throw new Error(actualizarImagenProductoResponse.iCode + "||" + actualizarImagenProductoResponse.sMessage);
					}
				}
				if(e.sAccion === "D"){
					var oEliminarImagen = {};
					oEliminarImagen.oAuditRequest  = oRequest.oAuditRequest;
					oEliminarImagen.oData          = {};
					oEliminarImagen.oData.iId			 = e.iId;      
					const eliminarProductoImagenResponse = await productoImagenTxDao.eliminarProductoImagen(oEliminarImagen);
					if(eliminarProductoImagenResponse.iCode !== 1){
						throw new Error(eliminarProductoImagenResponse.iCode + "||" + eliminarProductoImagenResponse.sMessage);
					}
				}

			});

		 }

		 //Actualizamos el precio del producto
		 if(oRequest.oData.aPrecio){
			oRequest.oData.aPrecio.forEach(async function(e){
				if(e.sAccion === "C"){
					var oRegistroPrecio = {};
					oRegistroPrecio.oAuditRequest  = oRequest.oAuditRequest;
					oRegistroPrecio.oData          		= {};
					oRegistroPrecio.oData.iProductoId   = parseInt(req.query.iId, 10); 
					oRegistroPrecio.oData.sCodEmpresa   = oEmpresa.CodEmpresa;
					oRegistroPrecio.oData.sEmpresa		= oEmpresa.RazonSocial;
					oRegistroPrecio.oData.sCodSede 		= e.sCodSede; 
					oRegistroPrecio.oData.sSede    		= e.sSede;      
					oRegistroPrecio.oData.sMoneda    	= e.sMoneda;          
					oRegistroPrecio.oData.fPrecioCosto  = e.fPrecioCosto;          
					oRegistroPrecio.oData.fImpuesto     = e.fImpuesto;          
					oRegistroPrecio.oData.fMargenGanancia = e.fMargenGanancia;          
					oRegistroPrecio.oData.fPrecioVenta    = e.fPrecioVenta;     
					oRegistroPrecio.oData.iCodEstadoPrecio = e.iCodEstadoPrecio; 
					oRegistroPrecio.oData.sEstadoPrecio    = e.sEstadoPrecio;      
					const registrarProductoPrecioResponse = await productoPrecioTxDao.registrarProductoPrecio(oRegistroPrecio);
					if(registrarProductoPrecioResponse.iCode !== 1){
						throw new Error(registrarProductoPrecioResponse.iCode + "||" + registrarProductoPrecioResponse.sMessage);
					 }
				}
				
				if(e.sAccion === "U"){
					var oActualizaPrecio = {};
					oActualizaPrecio.oAuditRequest  = oRequest.oAuditRequest;
					oActualizaPrecio.oData          		= {};
					oActualizaPrecio.oData.iId   		= e.iId; 
					oActualizaPrecio.oData.sCodSede 	= e.sCodSede; 
					oActualizaPrecio.oData.sSede    	= e.sSede;      
					oActualizaPrecio.oData.sMoneda    	= e.sMoneda;          
					oActualizaPrecio.oData.fPrecioCosto  = e.fPrecioCosto;          
					oActualizaPrecio.oData.fImpuesto     = e.fImpuesto;          
					oActualizaPrecio.oData.fMargenGanancia = e.fMargenGanancia;          
					oActualizaPrecio.oData.fPrecioVenta    = e.fPrecioVenta;     
					oActualizaPrecio.oData.iCodEstadoPrecio = e.iCodEstadoPrecio; 
					oActualizaPrecio.oData.sEstadoPrecio    = e.sEstadoPrecio;      
					const actualizarProductoPrecioResponse = await productoPrecioTxDao.actualizarProductoPrecio(oActualizaPrecio);
					if(actualizarProductoPrecioResponse.iCode !== 1){
						throw new Error(actualizarProductoPrecioResponse.iCode + "||" + actualizarProductoPrecioResponse.sMessage);
					 }
				}

				if(e.sAccion === "D"){
					var oEliminaPrecio = {};
					oEliminaPrecio.oAuditRequest  = oRequest.oAuditRequest;
					oEliminaPrecio.oData          		= {};
					oEliminaPrecio.oData.iId   		= e.iId;      
					const eliminarProductoPrecioResponse = await productoPrecioTxDao.eliminarProductoPrecio(oEliminaPrecio);
					if(eliminarProductoPrecioResponse.iCode !== 1){
						throw new Error(eliminarProductoPrecioResponse.iCode + "||" + eliminarProductoPrecioResponse.sMessage);
					 }
				}

			});
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
			var eliminarImagenxproductoIdResponse = await productoImagenTxDao.eliminarImagenxproductoId(oImagen); 
			if(eliminarImagenxproductoIdResponse.iCode !== 1){
				throw new Error(eliminarImagenxproductoIdResponse.iCode + "||" + eliminarImagenxproductoIdResponse.sMessage);
			} 

			//Eliminamos los precios del producto
			var oEliminaPrecio = {};
			oEliminaPrecio.oAuditRequest  = oRequest.oAuditRequest;
			oEliminaPrecio.oData          		= {};
			oEliminaPrecio.oData.iProductoId   		= parseInt(e, 10); 
			const eliminarPrecioxproductoIdResponse = await productoPrecioTxDao.eliminarPrecioxproductoId(oEliminaPrecio);
			if(eliminarPrecioxproductoIdResponse.iCode !== 1){
				throw new Error(eliminarPrecioxproductoIdResponse.iCode + "||" + eliminarPrecioxproductoIdResponse.sMessage);
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

