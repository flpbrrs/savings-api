import app from "./adapters/api/config";
import BcryptDataEncrypter from "./adapters/auth/BcryptDataEncrypter";
import JWTTokenGenerator from "./adapters/auth/JWTTokenGenerator";
import PrismaUserRepository from "./adapters/db/PrismaUserRepository";
import { loginController } from "./controllers/auth/loginController";
import { registrarUsuarioController } from "./controllers/auth/registrarUsuárioController";
import Login from "./core/auth/services/login";
import RegistrarUsuario from "./core/auth/services/registrarUsuario";

(async () => {
    const userRepository = new PrismaUserRepository()
    const dataEncrypter = new BcryptDataEncrypter()
    const jwtProvider = new JWTTokenGenerator()

    new registrarUsuarioController(app, new RegistrarUsuario(
        userRepository,
        dataEncrypter
    ))
    new loginController(app, new Login(
        userRepository,
        dataEncrypter,
        jwtProvider
    ))
})()