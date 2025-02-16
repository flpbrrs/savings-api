import { User } from "@prisma/client";

export default interface CasoDeUso<IN, OUT> {
    execute(dto: IN, usuario?: User): Promise<OUT>
}