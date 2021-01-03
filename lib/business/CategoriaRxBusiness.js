const categoriaRxDao = require('../dao/CategoriaRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar categoria
 * @creation David Villanueva 29/12/2020
 * @update
 */
exports.consultarCategoria = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroCategoria = {};
		 oFiltroCategoria.sCodigo  = req.query.sCodigo;
		 oFiltroCategoria.iId 	  = req.query.iId; 
		 var consultarCategoriaResponse =  await categoriaRxDao.consultarCategoria(oFiltroCategoria);
		 if(consultarCategoriaResponse.iCode !== 1){
			throw new Error(consultarCategoriaResponse.iCode + "||" + consultarCategoriaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarCategoriaResponse.oData;
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
 