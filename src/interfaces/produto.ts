import Estoque from "./estoque";

export default interface Produto{
	idProduto?:number,
	nome:string,
	precoCusto:number,
	precoLocacao:number,
	categoria:string,
}