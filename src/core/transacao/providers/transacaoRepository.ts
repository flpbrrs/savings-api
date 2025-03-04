import Resumo from "../model/Resumo";
import Transacao from "../model/Transacao";

export default interface TransacaoRepository {
    salvar(transacao: Transacao): Promise<void>
    findByDate(userId: string, mes: number, ano: number): Promise<Transacao[]>
    findById(transactionId: string): Promise<Transacao | null>
}