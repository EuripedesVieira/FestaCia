import {Request,Response} from 'express';
import Cliente from '../interfaces/cliente';
import {getAllCliente,createCliente,getByCpf,getById,deleteCliente,updadeCliente} from '../services/clienteService';

export default class ClienteController{
	
	async show(_:any,response:Response){
		try {
			let clientes = await getAllCliente();
			return response.status(200).json(clientes);
		} catch (error) {
			return response.status(500).json({
				erro:error
			})			
		}
	}

	async create(request:Request, response:Response){
		try {
			let cliente:Cliente = request.body.cliente;
			let data = await getByCpf(cliente.cpf);
			if(data){
				return response.status(400).json({
					message:"CPF já cadastrado"
				});

			}else{
				await createCliente(cliente);
				return response.status(200).json({
					message:"Cliente cadastrado com sucesso"
				});
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				erro:error
			})
		}
	}
	
	async update(request:Request, response:Response){
		try {
			let cliente:Cliente = request.body.cliente;
			if(cliente.idCliente){
				await updadeCliente(cliente);
				return response.status(200).json({
					message:"Cliente atualizado"
				})
			}else{
				return response.status(400).json({
					message:"Cliente não encontrado"
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
			let idCliente:number = Number(id);
			let data = await getById(idCliente);
			if(data){
				await deleteCliente(idCliente);
				return response.status(200).json({
					message:"Cliente deletado com sucesso"
				});
			}else{
				return response.status(400).json({
					message:"Cliente não existente"
				});
			}
		} catch (error) {
			return response.status(500).json({
				erro:error
			})
		}
	}
}