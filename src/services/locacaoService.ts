import connection from './../database/connection';
import tables from '../database/tables';
import Locacao from '../interfaces/locacao';
import ProdutoLocacao from '../interfaces/produtoLocacao';
import Estoque from '../interfaces/estoque';

export async function createLocacao(locacao:Locacao,produtosLocacao:ProdutoLocacao[]) {
	try {
		locacao.status="confirmada";
		let trx = await connection.transaction(); 
		let response:number[] = await trx(tables.LOCACOES)
			.insert(locacao)
			.returning(tables.references.idLocacao);
		
		let idLocacao = response[0];
		await Promise.all(
			produtosLocacao.map(async (produtoLocacao:ProdutoLocacao)=>{
				produtoLocacao.idLocacao=idLocacao;
				await trx(tables.PRODUTOS_lOCACAO).insert(produtoLocacao);
				await updateEstoque(trx,produtoLocacao);		
		}));
		trx.commit();

	} catch (error) {
		console.log(error);
		return error;
	}	
}

export async function updateLocacao(locacao:Locacao,produtosLocacao:ProdutoLocacao[]) {
	try {
	
		let trx = await connection.transaction(); 
		await trx(tables.LOCACOES)
			.where(tables.references.idLocacao,locacao.idLocacao)
			.update(locacao);
		
			await Promise.all(
				produtosLocacao.map(async (produtoLocacao:ProdutoLocacao)=>{
					await trx(tables.PRODUTOS_lOCACAO)
						.where(tables.references.idProdutoLocacao,produtoLocacao.idProdutoLocacao)
						.update(locacao);
				})
			);
	
		trx.commit();
	} catch (error) {
		console.log();
		return error
	}
}

export async function deleteLocacao(idLocacao:number){
	try {
			let status = await getStatusLocacao(idLocacao);
			console.log(status);
			if(status==="cancelada"){
				let trx = await connection.transaction();
				await trx(tables.PRODUTOS_lOCACAO)
					.where(tables.references.idLocacao,idLocacao).delete();
				
				await trx(tables.LOCACOES)
					.where(tables.references.idLocacao,idLocacao).delete();
					trx.commit();
			}else throw "Locação não pode ser deletada"
	} catch (error) {
		return Promise.reject(error);
	}
}


export async function isValidIdLocacao(idLocacao:number){
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.LOCACOES)
			.where(tables.references.idLocacao,idLocacao)
			.select(tables.references.idLocacao);

		if (data.length)return true
		else return false;		
	} catch (error) {
		console.log(error);
		return error
	}
}

export async function getAllLocacoes() {
	try {
		let trx = await connection.transaction();
		let dataLocacao = await trx(tables.LOCACOES).select("*");
		trx.commit();

		let locacaos = await Promise.all(
			dataLocacao.map(async (locacao:Locacao)=>{
				let {idLocacao}= locacao;
				let produtos = await getProdutosLocacao(Number(idLocacao));
				return {
					...locacao,
					produtos
				}
			}))
		
		return locacaos;
	} catch (error) {
		console.log(error);
		return error
	}
}

export async function getLocacoesById(idLocacao:number) {
	try {
		let trx = await connection.transaction();
		let dataLocacao = await trx(tables.LOCACOES)
			.where(tables.references.idLocacao,idLocacao)
			.select("*");
		trx.commit();

		let locacaos = await Promise.all(
			dataLocacao.map(async (locacao:Locacao)=>{
				let {idLocacao}= locacao;
				let produtos = await getProdutosLocacao(Number(idLocacao));
				return {
					...locacao,
					produtos
				}
			}))
		
		return locacaos;
	} catch (error) {
		console.log(error);
		return error
	}
}


export async function updateStatus(idLocacao:number,status:string) {

	try {
		let statusAtual:string = await getStatusLocacao(idLocacao);
		switch (status) {
			case "cancelada":
				if(statusAtual==="confirmada"){
					await liberaProdutos(idLocacao);
					await updateStatusLocacao(idLocacao,status);	
				}else throw "Operação não permitida"
				break;
	
			case "confirmada":
				if(statusAtual==="cancelada"){
					await diminiuEstoque(idLocacao);
					await updateStatusLocacao(idLocacao,status);	

				}else throw "Operação não permitida"
				break;
	
			case "realizada":
				if(statusAtual==="confirmada"){
					await liberaProdutos(idLocacao);
					await updateStatusLocacao(idLocacao,status);	
		
				}else throw "Operação não permitida"
				break;
		
			default:
				break;
		}
	} catch (error) {
		console.log(error)
		return Promise.reject(error)
		
	}		
}

async function getProdutosLocacao(idLocacao:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.PRODUTOS_lOCACAO)
			.join(tables.PRODUTOS,
				`${tables.PRODUTOS_lOCACAO}.${tables.references.idProduto}`,
				'=',
				`${tables.PRODUTOS}.${tables.references.idProduto}`)
			.where(tables.references.idLocacao,idLocacao)
			.select(
				`${tables.PRODUTOS_lOCACAO}.quantidade`,
				`${tables.PRODUTOS}.nome`,
				`${tables.PRODUTOS}.precoLocacao`,
				`${tables.PRODUTOS_lOCACAO}.${tables.references.idProduto}`
			);
		trx.commit();
		return data;
	} catch (error) {
		console.log(error);
		return error
	}
}

async function liberaProdutos(idLocacao:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.PRODUTOS_lOCACAO)
			.where(tables.references.idLocacao,idLocacao)
			.select("*");

	 
		await Promise.all(
			data.map(async (locaocaoProdutos:ProdutoLocacao)=>{
				console.log(locaocaoProdutos)
				let {idProduto,quantidade} = locaocaoProdutos;
				let quantidadeDisponivel = await getQuantidadeProduto(trx,idProduto);
				quantidadeDisponivel=quantidadeDisponivel+quantidade;
				
				await trx(tables.ESTOQUE)
					.where(tables.references.idProduto,idProduto)
					.update({quantidadeDisponivel})

			}))
		

			trx.commit();
	} catch (error) {
		console.log(error);
		return error
	}
	
}


async function getQuantidadeProduto(trx:any,idProduto:number) {
	try {
		let data = await trx(tables.ESTOQUE)
			.where(tables.references.idProduto,idProduto)
			.select('quantidadeDisponivel');
		
		let { quantidadeDisponivel }= data[0];
		return Number(quantidadeDisponivel);
	} catch (error) {
		console.log(error);
		return error
	}
	
}


async function getStatusLocacao(idLocacao:number) {
	try {
		let trx = await connection.transaction();
		let data = await trx(tables.LOCACOES)
			.where(tables.references.idLocacao,idLocacao)
			.select('status');
		trx.commit();
		let { status }= data[0];
		return String(status);
	} catch (error) {
		console.log(error);
		return error
	}
	
}


async function updateStatusLocacao(idLocacao:number,status:string) {
	try {
		let trx = await connection.transaction();
		await trx(tables.LOCACOES)
			.where(tables.references.idLocacao,idLocacao)
			.update({status})
		trx.commit();
	
	
	} catch (error) {
		console.log(error);
		return error
	}
	
}

async function updateEstoque(trx:any, produtoLocacao:ProdutoLocacao){
	let data =	await trx(tables.ESTOQUE)
		.where(tables.references.idProduto,produtoLocacao.idProduto);

	if(data.length>0){
		let estoque:Estoque= data[0];
		
		if(estoque.quantidadeDisponivel && estoque.quantidadeDisponivel>0){
			let quantidadeDisponivel:number = estoque.quantidadeDisponivel-produtoLocacao.quantidade
			await trx(tables.ESTOQUE)
			.where(tables.references.idEstoque,estoque.idEstoque)
			.update({quantidadeDisponivel});

		}
	}
}


export async function diminiuEstoque(idLocacao:number){
	try {
		let trx = await connection.transaction();
		let locaocaoProdutos = await trx(tables.PRODUTOS_lOCACAO)
			.where(tables.references.idLocacao,idLocacao)
			
		await Promise.all(locaocaoProdutos.map(async (locaocaoProduto:ProdutoLocacao)=>{
			await updateEstoque(trx,locaocaoProduto);
		}))
		trx.commit();
	} catch (error) {
		console.log(error);
		return error
	}

}