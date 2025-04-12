import Transaction from "./transaction.entity";

export default class Extrato {
    constructor(
        private readonly transacoes: Transaction[]
    ) { }

    get toDto() {
        return {
            total: this.total,
            income: this.incomes,
            expense: this.expenses,
            analysis: this.analysis,
            transacoes: this.transacoes.map(t => t.props)
        }
    }

    get total(): number {
        return this.incomes - this.expenses
    }

    get incomes(): number {
        return this.transacoes
            .filter(transacao => transacao.tipo.type === 'income')
            .reduce(this.totalize, 0)
    }

    get expenses(): number {
        return this.transacoes
            .filter(transacao => transacao.tipo.type === 'expense')
            .reduce(this.totalize, 0)
    }

    get analysis(): { name: string, [key: string]: number | string }[] {
        const partialAnalysis = this.transacoes
            .filter(transacao => transacao.tipo.type === 'expense')
            .reduce((acc, item) => {
                const label = item.descricao.value!.toLowerCase();
                acc[label] = (acc[label] || 0) + item.valor.value!;
                return acc;
            }, {} as Record<string, number>);

        return [{
            name: "current",
            ...partialAnalysis
        }];
    }

    private totalize(total: number, transacao: Transaction): number {
        return total + transacao.valor.value!
    }
}