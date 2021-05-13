import {Request,Response} from 'express';
import Estoque from '../interfaces/estoque';
import Produto from '../interfaces/produto';
import { createProduto, deleteProduto, getAllProduto, getByIdProduto, updateProduto } from '../services/produtoService';

export default class ProdutoController{
	
	async show(_:any,response:Response){
		try {
			let produtos = await getAllProduto();
			return response.status(200).json(produtos);
		} catch (error) {
			return response.status(500).json({
				erro:error
			})			
		}
	}

	async create(request:Request, response:Response){
		try {
			let produto:Produto = request.body.produto;
			let estoque:Estoque = request.body.estoque;
			await createProduto(produto,estoque);
			return response.status(200).json({
				message:"Produto cadastrado com sucesso"
			});
			
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				erro:error
			})
		}
	}
	
	async update(request:Request, response:Response){
		try {
			let produto:Produto = request.body.produto;
			let estoque:Estoque = request.body.estoque;
			if(produto.idProduto){
				await updateProduto(produto,estoque);
				return response.status(200).json({
					message:"Produto atualizado"
				})
			}else{
				return response.status(400).json({
					message:"Produto não encontrado"
				})
			}	
		} catch (error) {
			return response.status(500).json({
				erro:error
			})
		}
	}
	async delete(request:Request, response:Response){
		try {
			let { id } = request.query;
			let idProduto:number = Number(id);
			let data = await getByIdProduto(idProduto);
			if(data){
				await deleteProduto(idProduto);
				return response.status(200).json({
					message:"Produto deletado com sucesso"
				});
			}else{
				return response.status(400).json({
					message:"Produto não encontrado"
				});
			}
		} catch (error) {
			return response.status(500).json({
				erro:error
			})
		}
	}
}