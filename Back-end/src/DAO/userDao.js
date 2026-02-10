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
        const res = [token];
        return res;           
        

    } catch (error) {
        console.log("Erro ao encontrar o usuario: ", error.message);
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

export async function modificEmail(email,newEmail){
    try {
        //verifica primeiro se o email existe
        const [row] = await pools.query(`SELECT * FROM user WHERE email = ?`, [email]);
        
        if(row.length === 0)throw new Error("Email não encontrado na base de dados");
        const user = row[0];

        const [result] = await pools.query(`UPDATE user SET email = ? WHERE id = ?`,[newEmail,user.id]);
        if(result.affectedRows <= 0)throw new Error("Update falhou na alteração de email");
        return true;
        
    } catch (error) {
        console.log("Falha ao modificar email no banco de dados: ", error.message);
        return false;

    }

}

export async function modificPassword(password,email){
    try{
        const newPassword = await hashPassword(password);        
        const [result] = await pools.query(`UPDATE user SET password = ? WHERE email =?`, [newPassword,email]);
        
        if(result.affectedRows <= 0)throw new Error("Update falhou no banco de dados");

        return true;

    }catch(error){
        console.log("Falha ao modificar a senha no banco de dados: ", error.message);
        return false;
    }

}

export async function nameUser(id){
    try {
        
        const [row] = await pools.query(`SELECT nameUser FROM user WHERE id = ?`, [id]);

        if(row.length <= 0 )throw new Error("falha ao buscar nome no banco de dados");
        const name = row[0];
        return name.nameUser;

    } catch (error) {
        console.log("Erro ao buscar nome: ", error.message);
        return false;
    }
}