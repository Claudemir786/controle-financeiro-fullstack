import { getToken, saveName, saveToken } from "./TokenService.js";

//utilizada também no arquivo de transações
export const BASE_URL = "http://192.168.3.24:3000/api/";

//utilizado também para outras buscas (transações)
export async function authHeader(){
   const token = await getToken('auth')
    return {"Content-Type":"application/json",
    "Authorization": `Bearer ${token}`}
    
}

export async function UserLogin(email,password){

    try {
        const result = await fetch(`${BASE_URL}login`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({email,password})
        });
        if(!result.ok)throw new Error("Dados não retornaram corretamente da API");
        const res = await result.json();

        if(!res.token)throw new Error("Token não retornado pela API");

        await saveToken(res.token);

        return true;

        
    } catch (error) {
        console.error("falha ao buscar dados na api: ", error);
        return false;
    }
}

export async function UserCreate(name,email,password){
try {

    const result = await fetch(`${BASE_URL}create`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({name,email,password})
});

    if(!result.ok)throw new Error("Dados não retornaram do banco");   
    return true;


} catch (error) {
    console.error("Falha ao criar um novo usuário: ", error);
    return false;
}
}

export async function readUser(){
    try {
         
        const result = await fetch(`${BASE_URL}user`,{
            method: "GET",
            headers: await authHeader()
        });
        //console.log("o que retornou do banco: ", result);
        if(!result.ok)throw new Error("usuário não encontrado ");
        const res = await result.json();

        await saveName(res.name);//guarda o nome pra ser utilizado outras vezes
        return res.name;
        
    } catch (error) {
        console.error("Falha ao buscar usuário na base de dados: ", error);
        return false
    }
}

export async function alterEmail(newEmail, email) {
    try {

        const result = await fetch(`${BASE_URL}updateEmail`,{
            method:"PUT",
            headers: await authHeader(),
            body:JSON.stringify({newEmail,email})
        });

        if(!result.ok)throw new Error("Falha na requisição, alteração de email não foi efetuada com sucesso");

        return true;
        
    } catch (error) {
        console.error("Erro ao alterar email: ", error);
        return false;
    }
}

export async function alterPassword(password) {
    try {
        const result = await fetch(`${BASE_URL}updatePassword`,{
            method:'PUT',
            headers: await authHeader(),
            body:JSON.stringify({password})
        });

        if(!result.ok)throw new Error("Flaha na requisição, alteração de senha não foi efetuada com sucesso");
        return true;
        
    } catch (error) {
        console.error("falha ao alterar senha: ", error);
        return false;
    }
}
