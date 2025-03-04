import Resumo from "../model/Resumo";
import Transacao from "../model/Transacao";

export default interface TransacaoRepository {
    salvar(transacao: Transacao): Promise<void>
    gerarExtrato(userId: string): Promise<Transacao[]>
    gerarResumo(userId: string): Promise<Resumo>
    findById(transactionId: string): Promise<Transacao | null>
}