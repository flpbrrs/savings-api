import app from "./adapters/api/config";
import BcryptDataEncrypter from "./adapters/auth/BcryptDataEncrypter";
import JWTTokenGenerator from "./adapters/auth/JWTTokenGenerator";
import PrismaTransacaoRepository from "./adapters/db/PrismaTransacaoRepository";
import PrismaUserRepository from "./adapters/db/PrismaUserRepository";
import AuthMiddleware from "./controllers/auth/auth.middleware";
import { loginController } from "./controllers/auth/loginController";
import { ObterUsuarioAutenticadoController } from "./controllers/auth/obterUsuarioAtenticadoController";
import { registrarUsuarioController } from "./controllers/auth/registrarUsuárioController";
import obterExtratoController from "./controllers/transaction/obterExtratoController";
import { salvarTransacaoController } from "./controllers/transaction/salvarTransacaoController";
import Login from "./core/auth/services/login";
import RegistrarUsuario from "./core/auth/services/registrarUsuario";
import ObterExtrato from "./core/transacao/services/obterExtrato";
import SalvarTransacao from "./core/transacao/services/salvarTransacao";

(async () => {
    const userRepository = new PrismaUserRepository()
    const transacaoRepository = new PrismaTransacaoRepository()
    const dataEncrypter = new BcryptDataEncrypter()
    const jwtProvider = new JWTTokenGenerator(process.env.API_SECRET!)

    const RegistrarUsuárioUseCase = new RegistrarUsuario(userRepository, dataEncrypter)
    const loginUsuarioUserCase = new Login(userRepository, dataEncrypter, jwtProvider)
    const salvarTransacaoUseCase = new SalvarTransacao(transacaoRepository)
    const obterExtratoUseCase = new ObterExtrato(transacaoRepository)

    const authMiddleware = AuthMiddleware(userRepository, jwtProvider)

    new registrarUsuarioController(app, RegistrarUsuárioUseCase)
    new loginController(app, loginUsuarioUserCase)
    new ObterUsuarioAutenticadoController(app, authMiddleware)

    new salvarTransacaoController(app, salvarTransacaoUseCase, authMiddleware)
    new obterExtratoController(app, obterExtratoUseCase, authMiddleware)
})()