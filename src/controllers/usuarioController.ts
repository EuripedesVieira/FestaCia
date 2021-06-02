import {Request,Response} from 'express';
import Usuario from '../interfaces/usuario';
import { createUsuario, getAllUsuario, 
	getByPIN, updadeUsuario, getByIdUsuario, deleteUsuario } from '../services/usuarioService';

export default class UsuarioController{
	
	async show(_:any,response:Response){
		try {
			let usuarios = await getAllUsuario();
			return response.status(200).json(usuarios);
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})			
		}
	}

	async create(request:Request, response:Response){
		try {
			let usuario:Usuario = request.body.usuario;
			let data = await getByPIN(usuario.pin);
			if(data){
				return response.status(400).json({
					message:"PIN já cadastrado"
				});

			}else{
				await createUsuario(usuario);
				return response.status(200).json({
					message:"Usuario cadastrado com sucesso"
				});
			}
		} catch (error) {
			console.log(error);
			return response.status(500).json({
				erro:String(error)
			})
		}
	}
	
	async update(request:Request, response:Response){
		try {
			let usuario:Usuario = request.body.usuario;
			if(usuario.idUsuario){
				await updadeUsuario(usuario);
				return response.status(200).json({
					message:"Usuario atualizado"
				})
			}else{
				return response.status(400).json({
					message:"Usuario não encontrado"
				})
			}	
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}
	async delete(request:Request, response:Response){
		try {
			let { id } = request.query;
			let idUsuario:number = Number(id);
			let data = await getByIdUsuario(idUsuario);
			if(data){
				await deleteUsuario(idUsuario);
				return response.status(200).json({
					message:"Usuario deletado com sucesso"
				});
			}else{
				return response.status(400).json({
					message:"Usuario não existente"
				});
			}
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}

	async login(request:Request, response:Response){
		try {
			let pin:number = request.body.pin;

			let data = await getByPIN(pin);
			if(data){
				return response.status(200).json({
					message:"Login realizado com sucesso",
					login:true
				});
			}else{
				return response.status(400).json({
					message:"Login não realizado",
					login:false
				});
			}
		} catch (error) {
			return response.status(500).json({
				erro:String(error)
			})
		}
	}	
}