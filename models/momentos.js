'use strict'

class momento{
	constructor(id_contacto,id_tipo_respuesta,id_medio_contacto,id_proceso_venta,
		id_persona_contacto,id_archivo,fecha_momento,hora_momento,descripcion,hora_proxima,fecha_proxima,id_persona_usuario){
		this.id_contacto = id_contacto;
		this.id_tipo_respuesta = id_tipo_respuesta;
		this.id_medio_contacto = id_medio_contacto;
		this.id_proceso_venta = id_proceso_venta;
		this.id_persona_contacto = id_persona_contacto
		this.id_archivo = id_archivo;
		this.fecha_momento = fecha_momento;
		this.hora_momento = hora_momento;
		this.descripcion = descripcion;
		this.hora_proxima = hora_proxima;
		this.fecha_proxima = fecha_proxima;
		this.id_persona_usuario =id_persona_usuario;

	}
}
module.exports = momento;