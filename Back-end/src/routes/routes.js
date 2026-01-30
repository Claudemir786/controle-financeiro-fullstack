import { Router } from "express";
import { User } from "../controller/userControler.js";
import { Transaction } from "../controller/transactionController.js";

const route = Router();

const user = new User();
const transaction = new  Transaction();

//ROTAS USUÁRIO
route.post("/api/login", user.login);

//ROTAS TRANSAÇÕES
route.get("/api/transations", transaction.get);
export default route;