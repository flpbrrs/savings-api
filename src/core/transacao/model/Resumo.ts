export default interface Resumo {
    income: number,
    expense: number,
    analytics: {
        label: string,
        total: number,
    }[]
}