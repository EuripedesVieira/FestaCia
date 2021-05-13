import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.PRODUTOS,table=>{
		table.increments('idProduto').primary();
		table.string('nome',45).notNullable();
		table.float('precoCusto').notNullable();
		table.float('precoLocacao').notNullable();
		table.string('categoria',45).notNullable();
	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.PRODUTOS);
};