
import { messageFalse } from "../controller/userControler.js";
import { verifyToken } from "../utils/tokenJwt.js";



export function Auth(req,res,next){

    try {
        const header = req.headers.authorization;
        if(!header)return messageFalse(res,"Header enviado incorretamente");

        const [type,token] = header.split(" ");
        if(type !== 'Bearer' || !token)return messageFalse(res,"token ou tipo enviados incorretamente");

        const verific = verifyToken(token);
        if(!verific)return messageFalse(res,"Token invalido");
        req.user = verific;

        next();
        
    } catch (error) {
        console.log("Falha ao autenticar o token :", error);
        return messageFalse(res,"Falha ao autenticar o token");
    }
   
}