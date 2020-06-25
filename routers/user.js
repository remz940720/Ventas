'use strict'

var express = require('express');
let multer = require('multer');
var UserController = require('../controllers/user');
var path = require('path');
var api = express.Router();	
var md_auth = require('../middlewares/authenticated'); 

//var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir: './uploads/users'});


//En esta linea de codigo se sube el archivo
let storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img')
  },
  filename: function (req, file, cb) {
  	let id = req.params.id_empresa;
    cb(null,id +`${file.originalname.toLowerCase()}`);
  }
});  
let uploadVideo = multer({ storage: storageImage, 
	fileFilter: function (req, file, cb) {
		var ext = path.extname(file.originalname);
		console.log(ext);
		if (ext.toLowerCase() !== '.png' && ext.toLowerCase() !== '.jpg' && ext.toLowerCase() !== '.gif' && ext.toLowerCase() !== '.jpeg') {
			return cb(new Error('Only images are allowed'))
		}
		cb(null, true)
	}
						});

api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas);
api.post('/register',UserController.saveUser); //ok
api.get('/traerimagen/:imgfile',UserController.uploadimagen);//ok
api.post('/login',UserController.login); //ok
api.put('/actualizar/:id_usuario',md_auth.ensureAuth,UserController.actualizar);
api.post('/direccion',UserController.direccion); //ok
api.post('/registroempresa',UserController.registroempresa); //ok
api.post('/giro',UserController.giro);  //ok
api.post('/grupo',UserController.grupo); //ok
api.post('/sector',UserController.sector);  //ok
api.post('/contacto',UserController.contacto); //ok 
api.get('/traerempresa',UserController.traerempresas);//ok
api.get('/traercolonia',UserController.traercolonia);//ok
api.get('/traeralcaldia',UserController.traeralcaldia);//ok
api.get('/traerestado',UserController.traerestado);//ok
api.get('/traercontacto',UserController.traercontacto_empresa);//p
api.get('/traerstatus',UserController.traer_status_empresa);//ok
api.get('/traeragenda',UserController.traer_agenda);//ok
api.get('/traeridempresa/:id_empresa',UserController.traer_idempresa);//p
api.put('/editempresa/:id_empresa',UserController.editarempresa);//p
api.put('/editdireccion/:id_direccion',UserController.editardireccion);//p
api.put('/editcontacto/:id_contacto',UserController.editarcontacto);//p
api.get('/traer_momentos/:id_momento',UserController.traermomentos);//ok
api.post('/metemomentos',UserController.insertar_momento); //ok
api.get('/traerdireccion/:id_direccion',UserController.verdireccion);//ok
api.post('/insertarcolonia',UserController.consultarcolonia); //ok
api.post('/insertaralcaldia',UserController.consultaralcaldia); //ok
api.post('/insertarestado',UserController.consultarestado); //ok
api.post('/insertargrupo',UserController.consultargrupo);//ok
api.get('/traergrupo',UserController.traer_grupo);//ok
api.get('/traer_sector',UserController.consul_sector);//ok
api.get('/traertareas/:id_empresa',UserController.traer_tareas_empresa);//Ya no esta en la bd 
//api.put('/trae_tareas/:id_empresa/:id_tareas',UserController.modificar_tareas);
api.put('/traertareasestado/:id_empresa/:id_tareas',UserController.tarea_activa); //Ya no esta en la bd

//api.post('/');


//ruta para subir img
api.put('/subeImagen/:id_usuario', uploadVideo.single('imagen', 'id_usuario'), UserController.subeImg);//ok

//Nuevas funciones creadas

api.post('/insertaServicioOfrecer',UserController.insertar_servicioOfrecer); //ok
api.post('/insertaProcesoVenta',UserController.insertar_procesoVenta); //ok
api.post('/insertaArchivo',UserController.insertar_Archivo); //ok
api.post('/insertaAgenda',UserController.insertar_Agenda); //ok
api.post('/insertaTipoRespuesta',UserController.insertar_tipo_respuesta); //ok
api.post('/insertaMedioContacto',UserController.insertar_medio_contacto); //ok
api.post('/insertaStatus',UserController.insertar_status); //ok
api.post('/insertaOrigen',UserController.insertar_origen); //ok
api.post('/insertaSeguimiento',UserController.insertar_seguimiento); //ok
api.post('/insertaRole',UserController.insertar_role); //ok

module.exports = api;