import {Request,Response} from 'express';
import Locacao from '../interfaces/locacao';
import ProdutoLocacao from '../interfaces/produtoLocacao';
import {createLocacao,deleteLocacao,isValidIdLocacao,updateLocacao,getAllLocacoes, updateStatus} from '../services/locacaoService';

export default class LocacaoController{
	
	async show(_:any,response:Response){
		try {
			let locacoes = await getAllLocacoes();
			return response.status(200).json(locacoes);
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				erro:String(error)
			})			
		}
	}

	async create(request:Request, response:Response){
		try {
			let locacao:Locacao = request.body.locacao;
			let produtos:ProdutoLocacao[] = request.body.locacaoProduto;
			await createLocacao(locacao,produtos);
			return response.status(200).json({
				message:"locação cadastrado com sucesso"
			});

		} catch (error) {
			console.log(error);
			return response.status(500).json({
				erro:String(error)
			})
		}
	}
	
	async update(request:Request, response:Response){
		try {
			let locaocao:Locacao = request.body.produto;
			let produtos:ProdutoLocacao[] = request.body.produtos;

			let data = await isValidIdLocacao(Number(locaocao.idLocacao))

			if(data){
				await updateLocacao(locaocao,produtos);
				return response.status(200).json({
					message:"locacão atualizada"
				})
			}else{
				return response.status(400).json({
					message:"locação não encontrada"
				})
			}	
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}
	async delete(request:Request, response:Response) {
		try {
			let idLocacao:number = Number(request.query.locacao);
			let data = await isValidIdLocacao(idLocacao);
			if(data){
				await deleteLocacao(idLocacao)
					return response.status(200).json({
						message:"Locacao deletada com sucesso",
					})
			}else{
				return response.status(400).json({
					message:"Locacao não encontrada"
				});
			}
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}

	async updateStatus(request:Request, response:Response){
		try {
			let idLocacao:number = Number(request.query.locacao);
			let status:string = String(request.query.status);

			if(idLocacao && status){
				let data = await isValidIdLocacao(idLocacao);
				if(data){
					await updateStatus(idLocacao,status);
					return response.status(200).json({
						message:"Locacao atualizada"
					});
				}else{
					return response.status(400).json({
						message:"Locacao não encontrada"
					});
				}
			} 
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}
}