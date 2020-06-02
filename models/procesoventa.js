'use strict'

class Venta{
	constructor(id_proceso_venta,id_servicio_ofrecer,id_momento){
		this.id_proceso_venta= id_proceso_venta;
		this.id_servicio_ofrecer = id_servicio_ofrecer;
		this.id_momento = id_momento;
	}
}
module.exports = Venta;