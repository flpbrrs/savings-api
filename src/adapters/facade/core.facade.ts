import { TransacaoFacade } from "../../core/transacao/adapter";
import PrismaTransacaoRepository from "../db/PrismaTransacaoRepository";

export default class CoreFacade {
    public readonly transaction = new TransacaoFacade(
        new PrismaTransacaoRepository()
    )
}