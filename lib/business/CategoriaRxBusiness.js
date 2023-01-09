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
	 var oRequest			= null;
     try { 
		 oRequest		 = utils.customRequest(req);
		 var oEmpresa =  JSON.parse(oRequest.oAuditRequest.oEmpresa);
		 var oFiltroCategoria 			  		= {};
		 oFiltroCategoria.sCodigo  		  		= req.query.sCodigo;
		 oFiltroCategoria.iId 	   		  		= req.query.iId;  
		 oFiltroCategoria.iCodEstadoCategoria 	= req.query.iCodEstadoCategoria
		 oFiltroCategoria.sBuscaCategoria 		= req.query.sBuscaCategoria; 
		 oFiltroCategoria.sCodEmpresa			= oEmpresa.CodEmpresa;
		 var consultarCategoriaResponse =  await categoriaRxDao.consultarCategoria(oFiltroCategoria);
		 if(consultarCategoriaResponse.iCode !== 1){
			throw new Error(consultarCategoriaResponse.iCode + "||" + consultarCategoriaResponse.sMessage);
		 }

		 if(req.query.bBuscarPadre && consultarCategoriaResponse.oData[0].PadreId !== null){
			var oFiltroCategoria = {}; 
			oFiltroCategoria.iId 	   		     = consultarCategoriaResponse.oData[0].PadreId;  
			var consultarCategoriaPadreResponse   =  await categoriaRxDao.consultarCategoria(oFiltroCategoria);
			if(consultarCategoriaPadreResponse.iCode !== 1){
				throw new Error(consultarCategoriaPadreResponse.iCode + "||" + consultarCategoriaPadreResponse.sMessage);
			}
			consultarCategoriaResponse.oData.push(consultarCategoriaPadreResponse.oData[0]);
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
 