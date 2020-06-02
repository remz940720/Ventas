'use strict'
const knex = require('knex');
//Conexion BD
module.exports=knex({
	client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'intranet',
    port:'3306'
}

});