import connection from './../database/connection';
import tables from '../database/tables';
import Usuario from '../interfaces/usuario';

export async function createUsuario(usuario:Usuario) {
	try {
		let trx = await connection.transaction(); 
		await trx(tables.USUARIOS).insert(usuario);
		trx.commit();
	} catch (error) {
		console.log(error);
		return error;
	}	
}

export async function updadeUsuario(usuario:Usuario) {
	try {
		let trx = await connection.transaction(); 
		await trx(tables.USUARIOS).where(tables.references.idUsuario,usuario.idUsuario).update(usuario);
		trx.commit();
	} catch (error) {
		console.log();
		return error
	}
}

export async function getAllUsuario() {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.USUARIOS).select('*');
		trx.commit();
		return data;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function getByPIN(pin:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.USUARIOS).where('pin',pin).select('*');
		trx.commit();
		return data[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function getByIdUsuario(idUsuario:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.USUARIOS)
			.where(tables.references.idUsuario,idUsuario).select('*');
		trx.commit();
		return data[0];
	} catch (error) {
		console.log(error);
		return error;
	}
}

export async function deleteUsuario(idUsuario:number){
	try {
		let trx = await connection.transaction();
		await trx(tables.USUARIOS).where(tables.references.idUsuario,idUsuario).delete();
		trx.commit();
	} catch (error) {
		console.log(error);
		return error;
	}
}