'use strict'

class usuario{
	constructor(id_role,nombre,apellidopaterno,apellidomaterno,telefono,email,password,imagen){
        this.id_role = id_role;
		this.nombre = nombre;
		this.apellidopaterno = apellidopaterno;
		this.apellidomaterno = apellidomaterno;
		this.telefono = telefono;
		this.email = email;
        this.password = password;
        this.imagen = imagen;

	}
}

module.exports = usuario;