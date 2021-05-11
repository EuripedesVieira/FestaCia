import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.CLIENTES,table=>{
		table.increments('idCliente').primary();
		table.string('nome').notNullable();
		table.string('cpf').notNullable();
		table.string('telefone').notNullable();
		table.string('endereco').nullable();
	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.CLIENTES);
};