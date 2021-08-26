import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.PRODUTOS_lOCACAO,table=>{
		table.increments(tables.references.idProdutoLocacao).primary();
		table.integer(tables.references.idLocacao)
			.notNullable()
			.references(tables.references.idLocacao)
			.inTable(tables.LOCACOES);
		table.integer(tables.references.idProduto)
			.notNullable()
			.references(tables.references.idProduto)
			.inTable(tables.PRODUTOS);
		table.integer('quantidade').notNullable();
	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.PRODUTOS_lOCACAO);
};