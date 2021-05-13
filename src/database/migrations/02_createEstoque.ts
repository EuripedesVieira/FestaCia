import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.ESTOQUE,table=>{
		table.increments('idEstoque').primary();
		table.integer('idProduto')
			.notNullable()
			.references(tables.references.idProduto)
			.inTable(tables.PRODUTOS);
		table.integer('quantidadeTotal').notNullable();
		table.integer('quantidadeDisponivel').notNullable();
	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.ESTOQUE);
};