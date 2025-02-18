import app from "./adapters/api/config";
import BcryptDataEncrypter from "./adapters/auth/BcryptDataEncrypter";
import JWTTokenGenerator from "./adapters/auth/JWTTokenGenerator";
import PrismaUserRepository from "./adapters/db/PrismaUserRepository";
import AuthMiddleware from "./controllers/auth/auth.middleware";
import { loginController } from "./controllers/auth/loginController";
import { registrarUsuarioController } from "./controllers/auth/registrarUsuárioController";
import Login from "./core/auth/services/login";
import RegistrarUsuario from "./core/auth/services/registrarUsuario";

(async () => {
    const userRepository = new PrismaUserRepository()
    const dataEncrypter = new BcryptDataEncrypter()
    const jwtProvider = new JWTTokenGenerator(process.env.API_SECRET!)

    const RegistrarUsuárioUseCase = new RegistrarUsuario(userRepository, dataEncrypter)
    const loginUsuarioUserCase = new Login(userRepository, dataEncrypter, jwtProvider)

    const authMiddleware = AuthMiddleware(userRepository, jwtProvider)

    new registrarUsuarioController(app, RegistrarUsuárioUseCase, authMiddleware)
    new loginController(app, loginUsuarioUserCase)
})()