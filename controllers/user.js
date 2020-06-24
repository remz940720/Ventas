'use strict'
const CONN = require('./conection-controller');
var bcrypt = require('bcrypt');
let User = require('../models/usuario');
let Address = require('../models/address');
let Empresa = require('../models/empresa');
let Giroempresa = require('../models/giro');
let Grupoempresa = require('../models/grupo');
let Sectorempresa = require('../models/sector');
let ContactoPersona = require('../models/contactopersona');
let Status = require('../models/status');
let Agenda = require('../models/agenda');
let Momentos = require('../models/momentos');
let jwt = require('../services/jwt');
let Colonia = require('../models/colonia');
let Alcaldia = require('../models/alcaldia');
let Estado = require('../models/estado');
let moment = require('moment');
let Tareas = require('../models/tareas');
let Venta = require('../models/procesoventa');
let ServicioOfrecer =require('../models/servicio_ofrecer');
let archivo =require('../models/archivo');
let agenda = require('../models/agenda');
let tipoRespuesta =require('../models/tipo_respuesta');
let medioContacto=require('../models/medio_contacto');
let Origen = require('../models/origen');
let seguimiento = require('../models/seguimientoempresa');
let Role =require('../models/role');

let fs = require('fs');
let path = require('path');


function pruebas(req, res){
	res.status(200).send({message:'probando accion del controlador de usuarios del api res con node y knex'
});

}
//funcion para modificar tareas checkbox
function tarea_activa(req,res){
	let idempresa = req.params.id_empresa;
	let idtareas = req.params.id_tarea;
	let datoactivo = new Tareas(
		req.body.id_empresa);

	CONN('tareas').where('id_empresa',idempresa)
			.andWhere('id_tarea',idtareas).update('status','1')
			.then(statusactivo =>{
				console.log(statusactivo);
				if (!statusactivo){
					res.status(500).send({ resp: 'error', error: `${error}` });
				}else{
					res.status(200).send({ resp: 'consulta exitosa de status activo ', statusactivo:statusactivo});
				}
			})

}
//funcion para modificar las tareas del checkbox
// function modificar_tareas(req,res){
// 	let idempresa = req.params.id_empresa;
// 	let idtareas = req.params.id_tareas;

// 	let datotarea = new Tareas(
// 		req.body.id_empresa,
// 		);

// 	CONN('tareas').select().where('id_empresa',idempresa)
// 	.andWhere('id_tarea',idtareas).then(tareas_empresa =>{
// 		console.log(tareas_empresa);
// 		if (!tareas_empresa){

// 			res.status(500).send({ resp: 'error', error: `${error}` });
// 		}else{
			
// 			if (tareas_empresa.status == '0'){

// 				CONN('tareas').where('id_empresa',idempresa)
// 			.andWhere('id_tarea',idtraeas).update('status','1').then(stausactivo =>{
// 				if (!stausactivo){
// 					res.status(500).send({ resp: 'error', error: `${error}` });
// 				}else{
// 					res.status(200).send({ resp: 'consulta exitosa de status activo ', statusactivo:statusactivo, tareas_empresa});
// 				}
// 			})
// 			}else{CONN('tareas').where('id_empresa',idempresa)
// 			.andWhere('id_tarea',idtraeas).update('status','0').then(statusinactivo =>{
// 				if (!statusinactivo){
// 					res.status(500).send({ resp: 'error', error: `${error}` });
// 				}else{
// 					res.status(200).send({ resp: 'consulta exitosa de status activo ', statusinactivo:statusinactivo, tareas_empresa});
// 				}
// 			})

// 			}
			
// 		}
// 	})
// }
//funcion para traer las tareas con el id de empresa
function traer_tareas_empresa(req,res){
	let idempresa = req.params.id_empresa;
	CONN('tareas').where('tareas.id_empresa', idempresa)
	.join('empresa','tareas.id_empresa','=','empresa.id_empresa')
	.select().then(tareasempresa =>{
		if (!tareasempresa){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de tareas ', tareasempresa:tareasempresa});
		}
	})


}



//funcion para agregar role
function insertar_role(req,res){
	let role = new Role(
		req.body.descripcion
	);
	console.log(role);
	CONN('role').insert(role).then(insertarole =>{
		if (!insertarole){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el role', insertarole:insertarole});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}



//funcion para agregar seguimiento
function insertar_seguimiento(req,res){
	let Seguimiento = new seguimiento(
		req.body.id_agenda,
		req.body.id_momento
	);
	console.log(Seguimiento);
	CONN('vsc_seguimiento_empresa').insert(Seguimiento).then(insertaseguimiento =>{
		if (!insertaseguimiento){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el registro seguimiento empresa', insertaseguimiento:insertaseguimiento});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}



//funcion para agregar origen
function insertar_origen(req,res){
	let origen = new Origen(
		req.body.origen,
		req.body.id_persona
	);
	console.log(origen);
	CONN('vsc_origen').insert(origen).then(insertaorigen =>{
		if (!insertaorigen){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el origen', insertaorigen:insertaorigen});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}



//funcion para agregar status empresa
function insertar_status(req,res){
	let status = new Status(
		req.body.status
	);
	console.log(status);
	CONN('vsc_status').insert(status).then(insertastatus =>{
		if (!insertastatus){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el status', insertastatus:insertastatus});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}



//funcion para agregar medio de contacto
function insertar_medio_contacto(req,res){
	let medio_contacto = new medioContacto(
		req.body.medio_contacto
	);
	console.log(medio_contacto);
	CONN('vsc_medio_contacto').insert(medio_contacto).then(insertamedio =>{
		if (!insertamedio){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el medio de contacto', insertamedio:insertamedio});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}



//funcion para agregar tipo_respuesta
function insertar_tipo_respuesta(req,res){
	let Tipo_respuesta = new tipoRespuesta(
		req.body.tipo_respuesta
	);
	console.log(Tipo_respuesta);
	CONN('vsc_tipo_respuesta').insert(Tipo_respuesta).then(insertarespuesta =>{
		if (!insertarespuesta){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente la respuesta', insertarespuesta:insertarespuesta});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}


//funcion para agregar servicio a ofrecer
function insertar_servicioOfrecer(req,res){
	
	let servicioOfrecer = new ServicioOfrecer(
		req.body.servicio
		);
	console.log(servicioOfrecer);
	CONN('vsc_servicio_ofrecer').insert(servicioOfrecer).then(insertaservicio =>{
		if (!insertaservicio){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el servicio', insertaservicio:insertaservicio});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
	
}

//funcion para agregar servicio a ofrecer
function insertar_procesoVenta(req,res){
	
	let procesoVenta = new Venta(
		req.body.id_servicio_ofrecer,
		req.body.id_momento
		);
	console.log(procesoVenta);
	CONN('vsc_proceso_venta').insert(procesoVenta).then(insertaventa =>{
		if (!insertaventa){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el registro Proceso Venta', insertaventa:insertaventa});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
	
}

//funcion para agregar archivo
function insertar_Archivo(req,res){
	
	let Archivo = new archivo(
		req.body.id_archivos,
		req.body.ruta_doc,
		req.body.nombre,
		req.body.fecha
		);
	console.log(Archivo);
	CONN('vsc_archivo').insert(Archivo).then(insertaarchivo =>{
		if (!insertaarchivo){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el archivo', insertaarchivo:insertaarchivo});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
	
}

//funcion para agregar agenda
function insertar_Agenda(req,res){
	
	let Agenda = new agenda(
		req.body.id_agenda,
		req.body.id_contacto,
		req.body.id_usuario,
		req.body.fecha,
		req.body.hora,
		req.body.status,
		req.body.lugar_cita
		);
	console.log(Agenda);
	CONN('agenda').insert(Agenda).then(insertaagenda =>{
		if (!insertaagenda){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el registro en agenda', insertaagenda:insertaagenda});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
	
}


//funcion para agregar momento
function insertar_momento(req,res){
	let fechamoment = moment().format("YYYY-MM-DD");
	let horamoment = moment().format("h:mm:ss a");
	//let momentoid = req.params.id_momento;
	let momento = new Momentos(
		req.body.id_contacto,
		req.body.id_tipo_respuesta,
		req.body.id_medio_contacto,
		req.body.id_persona_contacto,
		req.body.id_archivo,
		req.body.fecha_momento,
		req.body.hora_momento,
		req.body.descripcion,
		req.body.hora_proxima,
		req.body.fecha_proxima,
		req.body.id_persona_contacto

		);
	console.log(momento);
	CONN('vsc_momento').insert(momento).then(insertamoment =>{
		if (!insertamoment){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'se a registrado correctamente el momento', insertamoment:insertamoment});
		}
		}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
	
}
function traermomentos(req,res){
	let idempresa = req.params.id_empresa;
	CONN('momentos').where('momentos.id_empresa',idempresa)
	.join('empresa','momentos.id_empresa', '=', 'empresa.id_empresa').select()
	.then(moment =>{
		if (!moment){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de momentos', moment:moment});
		}
	})
}





//funcion para actualizar el contacto
function editarcontacto(req,res){

	let contactoid = req.params.id_contacto;
	let contacto = new Contactoempresa(
		
		req.body.email,
		req.body.celular
		
		
		);

	CONN('contacto_empresa').where('id_contacto',contactoid).update({email:req.body.email,celular:req.body.celular}).then(editarcontacto =>{
		console.log(editarcontacto);
		if(!editarcontacto){
			res.status(500).send({resp: 'Error',error:'los datos no se actualizaron'});
		}else{
			CONN('contacto_empresa').where('id_contacto',contactoid).select().then(contacto =>{
				if (!contacto){
					res.status(500).send({resp: 'Error', error:'error en la consulta'});
				}else{
					res.status(200).send({resp:'Actualizacion de datos correcta',contacto: contacto});

				}
			}).catch(error =>{
				res.status(500).send({resp: 'error',
				error: `${error}`});
			});
		}
	})
}


//funcion para actualizar la direccion
function editardireccion(req,res){

	let direccionid = req.params.id_direccion;
	let direccion = new Address(
		req.body.id_colonia,
		req.body.id_alcaldia,
		req.body.id_estado,
		req.body.calle,
		req.body.numero_int,
		req.body.numero_ext,
		req.body.codigo_postal,
		req.body.alcaldia,
		req.body.estado,
		req.body.colonia
		);

	CONN('direccion_empresa').where('id_direccion',direccionid).update(direccion).then(editardireccion =>{
		console.log(editardireccion);
		if(!editardireccion){
			res.status(500).send({resp: 'Error',error:'los datos no se actualizaron'});
		}else{
			CONN('direccion_empresa').where('id_direccion',direccionid).select().then(direccion =>{
				if (!direccion){
					res.status(500).send({resp: 'Error', error:'error en la consulta'});
				}else{
					res.status(200).send({resp:'Actualizacion de datos correcta',direccion: direccion});

				}
			}).catch(error =>{
				res.status(500).send({resp: 'error',
				error: `${error}`});
			});
		}
	})
}

//funcion para ver direccion de archivos viejos
function verdireccion(req, res){
	let direccionid = req.params.id_direccion;

	CONN('empresa').where('id_direccion',direccionid).join('direccion_empresa','empresa.id_direccion', '=','direccion_empresa.id_direccion')

	.join('colonia','direccion_empresa.id_colonia', '=','colonia.id_colonia')
	.join('alcaldia','direccion_empresa.id_alcaldia', '=','alcaldia.id_alcaldia')
	.join('estado','direccion_empresa.id_estado', '=','estado.id_estado')
	.select().then(registrosviejos =>{

		if (!registrosviejos){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de registrosviejos', registrosviejos:registrosviejos});
		}

	})
}


//funcion para poder actualizar la empresa
function editarempresa(req,res){

	let empresaid = req.params.id_empresa;
	let empresa = new Empresa(
		
		req.body.nombre_empresa,
		req.body.id_status
		
		);

	CONN('empresa').where('id_empresa',empresaid).update({nombre_empresa:req.body.nombre_empresa,id_status:req.body.id_status}).then(editarnombre =>{
		console.log(editarnombre);
		if(!editarnombre){
			res.status(500).send({resp: 'Error',error:'los datos no se actualizaron'});
		}else{
			CONN('empresa').where('id_empresa',empresaid).select().then(nombre =>{
				if (!nombre){
					res.status(500).send({resp: 'Error', error:'error en la consulta'});
				}else{
					res.status(200).send({resp:'Actualizacion de datos correcta',nombre: nombre});

				}
			}).catch(error =>{
				res.status(500).send({resp: 'error',
				error: `${error}`});
			});
		}
	})
}

//funcion para consultar el id de la empresa
function traer_idempresa(req,res){
	let idempresa = req.params.id_empresa;
	CONN('empresa').where('id_empresa',idempresa).join('contacto_empresa','empresa.id_contacto','=','contacto_empresa.id_contacto')
	.join('status','empresa.id_status','=','status.id_status')

	.join('direccion_empresa','empresa.id_direccion', '=', 'direccion_empresa.id_direccion')

	.join('colonia','direccion_empresa.id_colonia', '=','colonia.id_colonia')
	.join('alcaldia','direccion_empresa.id_alcaldia', '=','alcaldia.id_alcaldia')
	.join('estado','direccion_empresa.id_estado', '=','estado.id_estado')

	.select().then(empresaid =>{
		//console.log(empresaid);
		if (!empresaid){
			res.status(500).send({resp:'Error',message:'No trajo id'})
		}else{
			res.status(200).send({empresaid:empresaid,message:'Exito al traer el id'});
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

//Metodo para subir la imagen del colaborador
function subeImg(req,res){
	let idempresa = req.params.id_empresa;
	let foto = req.file.filename;
	
	CONN('vsc_empresa').where('id_empresa',idempresa).
	update('logo',foto)
	.then(result=>{
		if (!result) {
			res.status(500).send({resp:'Error',message:'No se actualizo el contenido'})
		}else{
			CONN('empresa').select('logo').where('id_empresa',idempresa)
			.then(image=>{
				if (!image) {
					res.status(500).send({resp:'Error',message:'error al devolver video'})
				}
				else{
					res.status(200).send({image:image[0],message:'Exito al subir foto'});
				}
			}).catch(error=>{
				res.status(404).send({resp:'Error',error:`${error}`});
			})
		}
	}).catch(error=>{
		res.status(404).send({resp:'Error',error:`${error}`});
	})
}



//funcion para colsultar los datos de agenda
function traer_agenda(req,res){
	CONN('agenda').select().then(agenda =>{
		if (!agenda){
			res.status(500).send({resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp: 'consulta exitosa de agenda', agenda:agenda});
		}
	})
}

//funcion para consultar los datos de status_empresa
function traer_status_empresa(req,res){
	CONN('status').select().then(status =>{
		if (!status){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de status_empresa', status:status});
		}
	})
}

//funcion para consultar los datos de contactoempresa
function traercontacto_empresa(req,res){
	CONN('contacto_empresa').select().then(registros =>{
		if (!registros){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de contacto_empresa', registros:registros});
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

//funcion para CONSULTAR los datos de todas las empresas
function traerempresas(req,res){

	CONN('vsc_empresa')
	/*
	.join('contacto_empresa','empresa.id_contacto','=','contacto_empresa.id_contacto')
	.join('status','empresa.id_status','=','status.id_status')
	.join('direccion_empresa','empresa.id_direccion','=','direccion_empresa.id_direccion')
	.join('colonia','direccion_empresa.id_colonia', '=','colonia.id_colonia')
	.join('alcaldia','direccion_empresa.id_alcaldia', '=','alcaldia.id_alcaldia')
	.join('estado','direccion_empresa.id_estado', '=','estado.id_estado')
	*/

	.join('vsc_status','vsc_empresa.id_status','=','vsc_status.id_status')
	.join('cih_persona','cih_persona.id_persona','=','vsc_empresa.id_persona')
	.join('cih_direccion_persona','cih_direccion_persona.id_persona','=','cih_persona.id_persona')
	

	//cih_persona 
	//vsc_status
	//cih_direccion_persona
	//vsc_colonia
	//vsc_alcaldia
	//vsc_estado

	.select().orderBy('vsc_empresa.id_empresas')
	.then(todas =>{
			console.log(todas);
		if (!todas){
			
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa', todas:todas });
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

//metodo para agregar al contacto de la empresa
function contacto(req,res){
	let contactoPersona = new ContactoPersona(
		req.body.id_persona
		);
	console.log(contactoPersona);
	CONN('vsc_contacto_persona').insert(contactoPersona).then(idcontacto =>{

		if (!idcontacto){

			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'Datos almacenados de contacto', idcontacto:idcontacto });
		}		
	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}


//metodo para agregar giro
function giro(req,res){
	let giro = new Giroempresa(
	req.body.giro
	);

CONN('vsc_giro').insert(giro).then(idgiro =>{
	if(!idgiro){
		res.status(500).send({ resp: 'error', error: `${error}` });
	}else{
		res.status(200).send({ resp: 'Datos almacenados de giro', idgiro:idgiro });
	}
}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});


}

//funcion para consultar grupo
function traer_grupo(req,res){
	CONN('vsc_grupo').select().then(grupos =>{
		console.log(grupos);
		if (!grupos){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de grupo', grupos:grupos });
		}

	})
}

//funcion para agregar grupo
function grupo(req,res){
	let grupo = new Grupoempresa(
	req.body.grupo
	);

CONN('vsc_grupo').insert(grupo).then(idgrupo =>{
	console.log(grupo);
	if(!idgrupo){
		res.status(500).send({ resp: 'error', error: `${error}` });
	}else{
		res.status(200).send({ resp: 'Datos almacenados de Grupo', idgrupo:idgrupo });
	}
}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});


}
//funcion para consultar sector
function consul_sector(req,res){
	CONN('sector').select().then(traesectores =>{
		console.log(traesectores);
		if (!traesectores){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de sector', traesectores:traesectores });
		}

	})
}

//funcion para agregar sector
function sector(req,res){
	let sector = new Sectorempresa(
	req.body.sector
	);

CONN('vsc_sector').insert(sector).then(idsector =>{
	if(!idsector){
		res.status(500).send({ resp: 'error', error: `${error}` });
	}else{
		res.status(200).send({ resp: 'Datos almacenados de Sector', idsector:idsector });
	}
}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});


}

//funcion para traer colonia
function traercolonia(req, res){
	CONN('colonia').select().then(colonia =>{
		if (!colonia){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de colonia', colonia:colonia});
		}

	})
}
//funcion para traer alcaldia
function traeralcaldia(req, res){
	CONN('alcaldia').select().then(alcaldia =>{
		if (!alcaldia){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de alcaldia', alcaldia:alcaldia});
		}

	})
}
//funcion para traer estado
function traerestado(req, res){
	CONN('estado').select().then(estado =>{
		if (!estado){
			res.status(500).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({ resp: 'consulta exitosa de estado', estado:estado});
		}

	})
}

//funcion para insertar en estado con consulta
function consultarestado(req,res){
	let consulestado = new Estado(req.body.estado)

	CONN('cih_estado').where('estado',req.body.estado).select().then(traeestado =>{
		console.log(traeestado);
		if (traeestado == ''){
			CONN('cih_estado').insert(consulestado).then(insertaestado =>{
				if (!insertaestado){
					res.status(500).send({resp:'error', error: 'no se inserto estado'});
				}else{
					res.status(200).send({resp: 'estado guardada', insertaestado:insertaestado });
				}
			}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
		}else{
			res.status(200).send({resp: 'estado', traeestado:traeestado });
		}

	}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
}

//funcion para insertar en grupo con consulta
function consultargrupo(req,res){
	let consulgrupo = new Grupoempresa(req.body.grupo)

	CONN('grupo').where('grupo',req.body.grupo).select().then(traergrupo =>{
		console.log(traergrupo);
		if (traergrupo == ''){
			CONN('grupo').insert(consulgrupo).then(insertargrupo =>{
				if (!insertargrupo){
					res.status(500).send({resp:'error', error: 'no se inserto grupo'});
				}else{
					res.status(200).send({resp: 'grupo guardado', insertargrupo:insertargrupo });
				}
			}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
		}else{
			res.status(200).send({resp: 'grupo', traergrupo:traergrupo });
		}

	}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
}
//funcion para insertar en alcaldia con consulta
function consultaralcaldia(req,res){
	let consualcaldia = new Alcaldia(req.body.alcaldia)

	CONN('cih_alcaldia').where('alcaldia',req.body.alcaldia).select().then(traealcaldia =>{
		console.log(traealcaldia);
		if (traealcaldia == ''){
			CONN('cih_alcaldia').insert(consualcaldia).then(insertaralcaldia =>{
				if (!insertaralcaldia){
					res.status(500).send({resp:'error', error: 'no se inserto alcaldia'});
				}else{
					res.status(200).send({resp: 'alcaldia guardada', insertaralcaldia:insertaralcaldia });
				}
			}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
		}else{
			res.status(200).send({resp: 'alcaldia', traealcaldia:traealcaldia });
		}

	}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
}

//funcion para insertar en colonia con consulta
function consultarcolonia(req,res){
	let consulcolonia = new Colonia(req.body.colonia)

	CONN('cih_colonia').where('colonia',req.body.colonia).select().then(traercol =>{
		console.log(traercol);
		if (traercol == ''){
			CONN('cih_colonia').insert(consulcolonia).then(insertarcolonia =>{
				if (!insertarcolonia){
					res.status(500).send({resp:'error', error: 'no se inserto colonia'});
				}else{
					res.status(200).send({resp: 'colonia guardada', insertarcolonia:insertarcolonia });
				}
			}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
		}else{
			res.status(200).send({resp: 'colonia', traercol:traercol });
		}

	}).catch(error =>{
				res.status(500).send({resp:'error', error: `${error}` });
			});
}


//metodo para agregar direccion de la empresa 
function direccion(req, res){
	let direccion = new Address(
		req.body.id_colonia,
		req.body.id_alcaldia,
		req.body.id_estado,
		req.body.calle,
		req.body.numero_int,
		req.body.numero_ext,	
		req.body.codigo_postal,
		//req.body.alcaldia,
		//req.body.estado,
		//req.body.colonia,
		req.body.id_persona
		

		);

	CONN('cih_direccion_persona').insert(direccion).then(iddireccion =>{
		if(!iddireccion){
			res.status(200).send({ resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp:'Datos almacenados de direccion', iddireccion:iddireccion});
		}



	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});
}

//funcion para agregar datos de la empresa
function registroempresa(req,res){
	let fechamoment = moment().format("YYYY-MM-DD");
	let horamoment = moment().format("h:mm:ss a");
	let cliente = new Empresa(
		req.body.id_status,
		req.body.puesto,
		req.body.id_grupo,
		req.body.id_sector,
		req.body.id_giro,
		req.body.nivel_compra,
		req.body.num_empleados,
		req.body.id_persona,

		);
	
	CONN('vsc_empresa').insert(cliente).then(idempresa =>{
		console.log(cliente);
		if (!idempresa){
			res.status(200).send({resp: 'error', error: `${error}` });
		}else{
			res.status(200).send({resp:'Datos almacenados de empresa', idempresa:idempresa});
		}

	}).catch(error =>{
		res.status(500).send({resp: 'error', error: `${error}` });
	});

}

function saveUser(req, res){ 
	let usuario = new User(
		req.body.id_role,
		req.body.nombre,
		req.body.apellidopaterno,
		req.body.apellidomaterno,
		req.body.telefono,
		req.body.email,
		req.body.password,
		req.body.imagen
		);

console.log(usuario);
	
	CONN('usuario').select().where('email',req.body.email).then(Response =>{
		if(Response == ''){
			CONN('usuario').insert(usuario).then(nombre =>{

		if (!nombre){
			res.status(500).send({resp: 'Error', error: 'No se inserto el usuario'});

		}else{
			res.status(200).send({
				resp:'se guardo el registro',
				id_usuario:nombre
			});
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error',
			error: `${error}`});
	});


		}else{
			res.status(404).send({resp: 'error',error: 'email ya existe'});
		}
	})	

	

}



function login(req,res){
	//let id_usuario = req.body.id_usuario;
	let email = req.body.email;
	let pass = req.body.password;
	let gethash = req.body.gethash;

	CONN('usuario').where('email',email).andWhere('password',pass)
	.select().then(usuario =>{
		console.log(usuario);
		if (!usuario){
			res.status(500).send({resp: 'error', error: 'error en el servidor'});
		}else{
			if (usuario.length <= 0){
				res.status(404).send({resp:'error',error: 'error en el usuario o contraeña'});
			}else{
					if (gethash){
						
						let token = jwt.createToken(usuario);
						res.status(200).send({
							token:token,
							resp: 'sesion iniciada',
							datos_de_usuario:usuario

						});
					}else{
						res.status(200).send({message:'sesion iniciada',usuario:usuario});
					}
			}
		}
	}).catch(error =>{
		res.status(500).send({resp: 'error',error: `${error}`});
	})
}


function actualizar(req,res){

	let usuarioid = req.body.id_usuario;
	let usuario = new User(
		req.body.id_usuario,
		req.body.nombre,
		req.body.apellidopaterno,
		req.body.apellidomaterno,
		req.body.telefono,
		req.body.email,
		req.body.password
		);

	CONN('usuario').where('id_usuario',usuarioid).update(usuario).then(actualizarusuario =>{
		console.log(actualizarusuario);
		if(!actualizarusuario){
			res.status(500).send({resp: 'Error',error:'los datos no se actualizaron'});
		}else{
			CONN('usuario').where('id_usuario',usuarioid).select().then(usuario =>{
				if (!usuario){
					res.status(500).send({resp: 'Error', error:'error en la consulta'});
				}else{
					res.status(200).send({resp:'Actualizacion de datos correcta',usuario: usuario});

				}
			}).catch(error =>{
				res.status(500).send({resp: 'error',
				error: `${error}`});
			});
		}
	})
}

//para pasar la imagen
function uploadimagen(req,res){
	let imagefile = req.params.imgfile;//es la carpeta de la imagen
	//console.log(imagefile);
	let path_file = './img/' + imagefile;

	fs.exists(path_file, function(exists){
		if (exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(500).send({resp:'error',message:'error al devolver la imagen'})
		}
	});
	
}



module.exports = {
	pruebas,
	uploadimagen,
	saveUser,
	login,
	actualizar,
	direccion,
	registroempresa,
	giro,
	grupo,
	sector,
	contacto,
	traerempresas,
	traercontacto_empresa,
	traer_status_empresa,
	traer_agenda,
	subeImg,
	traer_idempresa,
	editarempresa,
	editardireccion,
	editarcontacto,
	traermomentos,
	insertar_momento,
	traercolonia,
	traeralcaldia,
	traerestado,
	verdireccion,
	consultarcolonia,
	consultaralcaldia,
	consultarestado,
	consultargrupo,
	traer_grupo,
	consul_sector,
	traer_tareas_empresa,
	tarea_activa,
	insertar_servicioOfrecer,
	insertar_procesoVenta, 
	insertar_Archivo,
	insertar_Agenda,
	insertar_tipo_respuesta,
	insertar_medio_contacto,
	insertar_status,
	insertar_origen,
	insertar_seguimiento,
	insertar_role
	
};


