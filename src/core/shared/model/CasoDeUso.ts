import { User } from "../../auth/model/User";

export default interface CasoDeUso<IN, OUT> {
    execute(dto: IN, usuario?: User): Promise<OUT>
}