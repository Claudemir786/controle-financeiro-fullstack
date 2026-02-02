import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { createToken } from "../utils/tokenJwt.js";
import pool from "./database.js";
const pools = pool;

export async function login(email, password){
    try {

        const [row] = await pools.query(`SELECT * FROM user WHERE email = ?`,[email]);

        if(row.length === 0)throw new Error("usuário não encontrado na base de dados");

        const user = row[0];//guarda o usuário que retorna
        const correctPassword = await comparePassword(password,user.password);

        if(!correctPassword)throw new Error("Verificação de senha falhou, as senhas não são iguais");

        const token = createToken(user);
        if(!token)throw new Error("Falha ao criar o token");
        return token;           
        

    } catch (error) {
        console.log("Erro ao encontrar o usuario: ", error);
        return false;

    }


}

export async function create(name,email,password){

    try {
        const passwordHash = await hashPassword(password);//criptografa a senha

        const [result] = await pools.query(`INSERT INTO user (nameUser,email,password)VALUES
                                    (?,?,?)`, [name,email,passwordHash]);

        return result.insertId && result.affectedRows > 0 ? true : false;                            
        
    } catch (error) {
        console.log("Erro ao criar novo usuário: ", error);
        return false;
    }
   

}

export async function modificEmail(email){

}

export async function modificPassword(password){

}