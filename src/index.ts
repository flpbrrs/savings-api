import app from "./adapters/api/config";
import BcryptDataEncrypter from "./adapters/auth/BcryptDataEncrypter";
import PrismaUserRepository from "./adapters/db/PrismaUserRepository";
import { registrarUsuarioController } from "./controllers/auth/registrarUsuárioController";
import RegistrarUsuario from "./core/auth/services/registrarUsuario";

(async () => {
    const userRepository = new PrismaUserRepository()
    const dataEncrypter = new BcryptDataEncrypter()

    new registrarUsuarioController(app, new RegistrarUsuario(
        userRepository,
        dataEncrypter
    ))
})()