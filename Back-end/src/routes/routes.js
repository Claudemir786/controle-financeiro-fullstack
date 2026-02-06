import { Router } from "express";
import { User } from "../controller/userControler.js";
import { Transaction } from "../controller/transactionController.js";
import { Auth } from "../middleware/auth.js";

const route = Router();

const user = new User();
const transaction = new  Transaction();

//ROTAS USUÁRIO
route.post("/api/login", user.login);
route.post("/api/create", Auth, user.create);
route.put("/api/updateEmail", Auth, user.alterEmail);
route.put("/api/updatePassword", Auth, user.alterPassword);
route.get("/api/user", Auth, user.nameUser);


//ROTAS TRANSAÇÕES
route.get("/api/info", Auth, transaction.info);
route.post("/api/createT", Auth, transaction.create);
route.get("/api/read/transaction", Auth, transaction.readTransaction);


export default route;