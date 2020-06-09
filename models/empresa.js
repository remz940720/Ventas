'use strict'
class empresa{
	constructor(id_empresas,id_status,puesto,id_grupo,id_sector,id_giro,nivel_compra,num_empleados,id_persona){
		this.id_empresas = id_empresas;
		this.id_status = id_status;
		this.puesto = puesto
		this.id_grupo = id_grupo;
		this.id_sector = id_sector;
		this.id_giro = id_giro;
		this.nivel_compra = nivel_compra;
		this.num_empleados = num_empleados;
		this.id_persona= id_persona;
	}

}

module.exports = empresa;