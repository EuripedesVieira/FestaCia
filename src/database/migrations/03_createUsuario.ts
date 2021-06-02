import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.USUARIOS,table=>{
		table.increments('idUsuario').primary();
		table.string('nomeUsuario').notNullable();
		table.integer('pin').notNullable().unique();
	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.USUARIOS);
};