import { User } from "../core/auth/model/User";

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}