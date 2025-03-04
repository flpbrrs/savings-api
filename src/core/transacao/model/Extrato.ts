import Transacao from "./Transacao";

export default class Extrato {
    constructor(
        private readonly transacoes: Transacao[]
    ) { }

    get toDto() {
        return {
            total: this.total,
            income: this.incomes,
            expense: this.expenses,
            analysis: this.analysis,
            transacoes: this.transacoes
        }
    }

    get total(): number {
        return this.incomes - this.expenses
    }

    get incomes(): number {
        return this.transacoes
            .filter(transacao => transacao.tipo === 'income')
            .reduce(this.totalize, 0)
    }

    get expenses(): number {
        return this.transacoes
            .filter(transacao => transacao.tipo === 'expense')
            .reduce(this.totalize, 0)
    }

    get analysis(): { label: string, total: number }[] {
        return this.transacoes
            .filter(transacao => transacao.tipo === 'expense')
            .reduce((acc: any, item) => {
                const label = item.descricao.toLowerCase();
                acc[label] = (acc[label] || 0) + Number(item.valor);
                return acc;
            }, {})
    }

    private totalize(total: number, transacao: Transacao): number {
        return total + transacao.valor
    }
}