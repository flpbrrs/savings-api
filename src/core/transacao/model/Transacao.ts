export default interface Transacao {
    id: string,
    titulo: string,
    descricao?: string,
    valor: number,
    data: Date,
    tipo: string,
    userId: string,
}