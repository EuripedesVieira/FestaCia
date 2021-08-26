export default interface Locacao {
	idLocacao?:number,
	idCliente:number,
	datainicial:string,
	datafinal:string,
	status:string,
	valorTotal:number,
	taxaAdicional:number,
	CustoOperacional:number
}