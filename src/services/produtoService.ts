import connection from '../database/connection';
import tables from '../database/tables';
import Estoque from '../interfaces/estoque';
import Produto from '../interfaces/produto';


async function createProduto(produto:Produto,estoque:Estoque) {
	try {
		let trx = await connection.transaction();
		let idProduto = await trx(tables.PRODUTOS)
			.insert(produto)
			.returning(tables.references.idProduto);

		estoque.idProduto=Number(idProduto);
		await trx(tables.ESTOQUE).insert(estoque);
		trx.commit();			
	} catch (error) {
		console.log(error)
		return error;
	}
}


async function deleteProduto(idProduto:number) {
	try {
		let trx = await connection.transaction();
		await trx(tables.ESTOQUE)
			.where(tables.references.idProduto,idProduto).delete();
		await trx(tables.PRODUTOS)
			.where(tables.references.idProduto,idProduto).delete();
		trx.commit();
	} catch (error) {
		console.log(error);
		return error
	}	
}

async function updateProduto(produto:Produto,estoque:Estoque) {
	try {
		let trx = await connection.transaction();
		await trx(tables.ESTOQUE)
			.where(tables.references.idEstoque,estoque.idEstoque)
			.update(estoque);

		await trx(tables.PRODUTOS)
			.where(tables.references.idProduto)
			.update(produto);

		trx.commit();
	} catch (error) {
		console.log(error);
		return error;
	}
}

async function getAllProduto() {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.PRODUTOS).select('*');
		
		let produtoEstoque = Promise.all(
			data.map(async(produto:Produto)=>{
				let dataEstoque = await trx(tables.ESTOQUE)
					.where(tables.references.idProduto,produto.idProduto)
					.select('*');

				let estoque:Estoque = dataEstoque[0];
				delete estoque.idProduto;
				return{
					...produto,
					estoque
				}
			})
		)

		trx.commit();
		return produtoEstoque;
	} catch (error) {
		console.log(error);
		return error;
	}
}

async function getByIdProdutoEstoque(idProduto:number){
	try {
		let trx = await connection.transaction();
		let dataProduto = await trx(tables.PRODUTOS)
			.where(tables.references.idProduto,idProduto)
			.select('*');

		let dataEstoque = await trx(tables.ESTOQUE)
			.where(tables.references.idProduto,idProduto)
			.select('*');

		let produto:Produto = dataProduto[0];
		let estoque:Estoque = dataEstoque[0];
		delete estoque.idProduto;

		let data = {
			...produto,
			estoque
		}

		trx.commit();
		return data;
	} catch (error) {
		console.log(error)
		return error;
	}	
}


async function getByIdProduto(idProduto:number){
	try {
		let trx = await connection.transaction();
		let dataProduto = await trx(tables.PRODUTOS)
			.where(tables.references.idProduto,idProduto)
			.select('*');

		let data:Produto = dataProduto[0];
		trx.commit();
		return data;
	} catch (error) {
		console.log(error)
		return error;
	}	
}

export {getAllProduto,getByIdProduto,
	createProduto,updateProduto,
	deleteProduto,getByIdProdutoEstoque}