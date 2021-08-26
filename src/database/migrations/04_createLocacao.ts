import Knex from 'knex';
import tables from './../tables';

export async function up(knex:Knex) {
	return knex.schema.createTable(tables.LOCACOES,table=>{
		table.increments('idLocacao').primary();
		table.integer('idCliente').notNullable()
			.references(tables.references.idCliente)
			.inTable(tables.CLIENTES);
		table.date('datainicial').notNullable();
		table.date('datafinal').notNullable();
		table.string('status',45).notNullable();
		table.float('valorTotal').notNullable();
		table.float('taxaAdicional').notNullable();
		table.float('CustoOperacional').notNullable();

	});
};

export async function down (knex:Knex){
	return knex.schema.dropTable(tables.LOCACOES);
};