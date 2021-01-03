const marcaRxDao		 = require('../dao/MarcaRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar las marcas
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarMarca = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
		 //Verificamos si ya exista la tabla
		 var oFiltroSede = {};
		 oFiltroSede.iSedeId  = req.query.iSedeId;
		 oFiltroSede.iId 	  = req.query.iId; 
		 var consultarMarcaResponse =  await marcaRxDao.consultarMarca(oFiltroSede);
		 if(consultarMarcaResponse.iCode !== 1){
			throw new Error(consultarMarcaResponse.iCode + "||" + consultarMarcaResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarMarcaResponse.oData;
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
 