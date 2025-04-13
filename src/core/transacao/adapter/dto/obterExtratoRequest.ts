import { User } from "../../../auth/model/User"

export interface ObterExtratoRequest {
    mes: number
    ano: number
    usuario: User
}