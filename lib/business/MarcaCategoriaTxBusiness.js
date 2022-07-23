const marcaCategoriaTxDao	 = require('../dao/MarcaCategoriaTxDao');  
const utils 	     	 = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar las categorias asignadas a una marca
 * @creation David Villanueva 18/04/2021
 * @update
 */
exports.registrarMarcaCategoria = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Registramos categoria
		 oRequest.oData.aItems.forEach(async function(e){
			var oRegistroArea = {};
			oRegistroArea.oAuditRequest  = oRequest.oAuditRequest;
			oRegistroArea.oData		  		= {}; 
			oRegistroArea.oData.iCategoriaId = e; 
			oRegistroArea.oData.iMarcaId = oRequest.oData.iMarcaId;
			const crearMarcaCategoriaResponse = await  marcaCategoriaTxDao.crearMarcaCategoria(oRegistroArea);
			if(crearMarcaCategoriaResponse.iCode !== 1){
				throw new Error(crearMarcaCategoriaResponse.iCode + "||" + crearMarcaCategoriaResponse.sMessage);
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

 
/**
 * @description Función que permite eliminar las categorias asignadas a la marca
 * @creation David Villanueva 18/04/2021
 * @update
 */
exports.eliminarMarcaCategoria = async (req, res) => { 
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
			const eliminarMarcaCategoriaResponse = await  marcaCategoriaTxDao.eliminarMarcaCategoria(oRegistro);
			if(eliminarMarcaCategoriaResponse.iCode !== 1){
				throw new Error(eliminarMarcaCategoriaResponse.iCode + "||" + eliminarMarcaCategoriaResponse.sMessage);
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

