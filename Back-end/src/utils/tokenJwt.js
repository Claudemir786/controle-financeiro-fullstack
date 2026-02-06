import jwt from "jsonwebtoken";

const TOKEN = "eyJhbGciOiJIUzM4NCJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTc3MDA";

export function createToken(user){

    const token = jwt.sign({email: user.email, id:user.id}, TOKEN, {expiresIn:"1h"});
    
    if(!token)return false;
    console.log("Token criado com sucesso");
    return token;
}

export function verifyToken(token){    
    try {

        const verify = jwt.verify(token, TOKEN);
        return verify;

    } catch (error) {
        return false;
    }
   
}