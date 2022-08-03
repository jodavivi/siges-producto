const inventarioRxDao = require('../dao/InventarioRxDao'); 
const utils 	  	  = require('../utils/utils'); 
const productoRxDao		= require('../dao/ProductoRxDao'); 
 
/**
 * @description Función que permite consultar inventario
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.consultarInventario = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroInv 			= {}; 
		 oFiltroInv.iId 	  		= req.query.iId; 
		 var consultarInventarioResponse =  await inventarioRxDao.consultarInventario(oFiltroInv);
		 if(consultarInventarioResponse.iCode !== 1){
			throw new Error(consultarInventarioResponse.iCode + "||" + consultarInventarioResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarInventarioResponse.oData;
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
 
/**
 * @description Función que permite consultar la disponibilidad de producto
 * @creation David Villanueva 02/08/2022
 * @update
 */
 exports.consultarDisponibilidadProducto = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {}; 
	var oRequest			= null;
	try { 
		oRequest		 = utils.customRequest(req);  

		//Buscar Producto
		var oFiltroProducto = {}; 
		oFiltroProducto.sCodEmpresa 	= oRequest.oAuditRequest.sSociedad;  
		oFiltroProducto.sCodigo  	  	= req.query.sCodigo;
		oFiltroProducto.iId 	  	  	= req.query.iId; 
		oFiltroProducto.sCodigoBarra = req.query.sCodigoBarra
		var consultarProductoResponse =  await productoRxDao.consultarProducto(oFiltroProducto);
		if(consultarProductoResponse.iCode !== 1){
		   throw new Error(consultarProductoResponse.iCode + "||" + consultarProductoResponse.sMessage);
		}
		var aProductos = consultarProductoResponse.oData;  
		var aProductoId = [];
		aProductos.forEach(function(e){
			aProductoId.push(e.Id);
		});
		var oFiltroInv 			=   {}; 
		oFiltroInv.sCodEmpresa 	=   oRequest.oAuditRequest.sSociedad;  
		oFiltroInv.sCodSede     =  'S002';
		oFiltroInv.sCodAlmacen  =  'A004'
	    oFiltroInv.aProductoId  = aProductoId;  
		var consultarDisponibilidadProductoResponse =  await inventarioRxDao.consultarDisponibilidadProducto(oFiltroInv);
		if(consultarDisponibilidadProductoResponse.iCode !== 1){
		   throw new Error(consultarDisponibilidadProductoResponse.iCode + "||" + consultarDisponibilidadProductoResponse.sMessage);
		}

		var aInventario = consultarDisponibilidadProductoResponse.oData;
		var aNuevoProductos = [];
		aProductos.forEach(function(e){
			var item = e.toJSON(); 
			item.CantidadDisponible = 0;
			for (let index = 0; index < aInventario.length; index++) {
				const element = aInventario[index];
				if(item.Id === element.ProductoId){
					item.CantidadDisponible = element.CantidadDisponible;
					item.CodSede = element.CodSede;
					item.CodAlmacen = element.CodAlmacen;
					aNuevoProductos.push(item);
					break;
				}
			}
		});

		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= aNuevoProductos;
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