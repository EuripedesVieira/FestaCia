import connection from './../database/connection';
import Cliente from "../interfaces/cliente";
import tables from '../database/tables';

export async function createCliente(cliente:Cliente) {
	try {
		let trx = await connection.transaction(); 
		await trx(tables.CLIENTES).insert(cliente);
		trx.commit();
	} catch (error) {
		console.log(error);
		return error;
	}	
}

export async function updadeCliente(cliente:Cliente) {
	try {
		let trx = await connection.transaction(); 
		await trx(tables.CLIENTES).where('idCliente',cliente.idCliente).update(cliente);
		trx.commit();
	} catch (error) {
		console.log();
		return error
	}
}

export async function getAllCliente() {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.CLIENTES).select('*');
		trx.commit();
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function getByCpf(cpf:string) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.CLIENTES).where('cpf',cpf).select('*');
		trx.commit();
		return data[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function getById(idCliente:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.CLIENTES).where('idCliente',idCliente).select('*');
		trx.commit();
		return data[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function deleteCliente(idCliente:number){
	try {
		let trx = await connection.transaction();
		await trx(tables.CLIENTES).where('idCliente',idCliente).delete();
		trx.commit();
	} catch (error) {
		console.log(error);
		return error;
	}
}