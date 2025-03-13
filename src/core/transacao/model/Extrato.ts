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
        const partialAnalysis = this.transacoes
            .filter(transacao => transacao.tipo === 'expense')
            .reduce((acc, item) => {
                const label = item.descricao.toLowerCase();
                acc[label] = (acc[label] || 0) + item.valor;
                return acc;
            }, {} as Record<string, number>);

        return Object.entries(partialAnalysis)
            .map(([label, value]) => ({ label, total: value }))
    }

    private totalize(total: number, transacao: Transacao): number {
        return total + transacao.valor
    }
}