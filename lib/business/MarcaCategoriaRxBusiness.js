const marcaCategoriaRxDao	= require('../dao/MarcaCategoriaRxDao'); 
const utils 		 		= require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las categorias por marca
 * @creation David Villanueva 15/04/2021
 * @update
 */
exports.consultarMarcaCategoria = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
 
		 var oFiltroProducto = {};  
		 oFiltroProducto.sCodigo  	  = req.query.sCodigo;
		 oFiltroProducto.iMarcaId 	  = req.query.iMarcaId; 
		 oFiltroProducto.iId 	  	  = req.query.iId; 
		 var consultarMarcaCategoriaResponse =  await marcaCategoriaRxDao.consultarMarcaCategoria(oFiltroProducto);
		 if(consultarMarcaCategoriaResponse.iCode !== 1){
			throw new Error(consultarMarcaCategoriaResponse.iCode + "||" + consultarMarcaCategoriaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarMarcaCategoriaResponse.oData;
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
 * @description Función que permite consultar marcas por categoria
 * @creation David Villanueva 25/04/2021
 * @update
 */
 exports.consultarCategoriaxMarca = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {}; 
	try { 

		var oFiltroProducto = {};   
		oFiltroProducto.iCategoriaId 	  	  = req.query.iCategoriaId; 
		var consultarCategoriaxMarcaResponse =  await marcaCategoriaRxDao.consultarCategoriaxMarca(oFiltroProducto);
		if(consultarCategoriaxMarcaResponse.iCode !== 1){
		   throw new Error(consultarCategoriaxMarcaResponse.iCode + "||" + consultarCategoriaxMarcaResponse.sMessage);
		}
		 oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData		= consultarCategoriaxMarcaResponse.oData;
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