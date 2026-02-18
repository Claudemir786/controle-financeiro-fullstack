import { create, login, modificEmail, modificPassword, nameUser } from "../DAO/userDao.js";

//função criada apenas para responder com erro pois a menssagem estava se repetindo muito
export function messageFalse(res,men){
        return res.status(401).json({sucesses:false, message:men});
    }

export class User{
    
    
   async login(req,res){
        try {
       
            if(!req.body)res.status(401).json({success:false, message:"Corpo da requisição não encontrado"});
        
            const{email,password} = req.body;
            if(!email || !password)res.status(401).json({success:false, message:"dados enviados incorretamente"});
            
            const userLogin = await login(email,password);
            if(!userLogin)res.status(401).json({success:false, message:"usuário não encontrado"});


            return res.status(200).json({success:true, token:userLogin[0]});

        } catch (error) {
            console.log("Erro ao fazer o login: ", error);
            return res.status(401).json({success:false, message:"falha ao fazer login"});
        }
    }

    async create(req,res){
        try {   
            console.log("cheguei aqui");         
            const{name,email,password} = req.body;
            if(!name || !email || !password)res.status(401).json({success:false, message:"dados enviados incorretamente"});
            
            const createUser = await create(name,email,password);
            if(!createUser)res.status(401).json({success:false, message:"erro ao criar novo usuário"});

            return res.status(201).json({success:true, message:"usuário criado com sucesso"});

        } catch (error) {
            console.log("Falha ao fazer requisição: ", error);
            return res.status(401).json({success:false, message:"Falha ao fazer requisição"});
        }
    }

    async alterEmail(req,res){
        try {
            
            const{newEmail,email} = req.body;
            if(!email || !newEmail)return messageFalse(res,"dados enviados incorretamente");

            const userEmail = await modificEmail(email, newEmail);
            if(!userEmail)return messageFalse(res,"falha ao modificar email");

            return res.status(200).json({success:true, message:"email alterado com sucesso"});

        } catch (error) {
            console.log("falha ao fazer a requisição: ", error);
            return messageFalse(res,"falha na requisição");
        }
    }

    async alterPassword(req,res){
        try {
            
            const {password} = req.body;
            if(!password)return messageFalse(res,"dados enviados incorretamente");
            const idUser = req.user.id;
            const userPassword = await modificPassword(password,idUser);
            if(!userPassword)return messageFalse(res,"falha ao alterar senha");

            return res.status(200).json({success:true, message:"senha alterada com sucesso"});            

        } catch (error) {
            console.log("falha na requisição: ", error);
            return messageFalse(res,"Falha ao alterar senha");
        }
    }
    async nameUser(req,res){
        try {
            /*const{id} = req.body;
            if(!id)return messageFalse(res,"dados enviados incorretamente");*/
            //console.log("cheguei na api");
            const idUser = req.user.id;

            const name = await nameUser(idUser);
            if(!name)return messageFalse(req,"falha na busca do nome");

            return res.status(200).json({success:true, name:name});

        } catch (error) {
            console.log("falha na requisição: ", error);
            return messageFalse(res,"falha ao buscar nome de usuário");
        }
    }
}