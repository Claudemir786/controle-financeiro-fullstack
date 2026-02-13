import { createTransaction, readTransaction, transactionInformation } from "../DAO/transactionDao.js";
import { messageFalse } from "./userControler.js";

export class Transaction{
    async info(req,res){
       try{   
         /*const{id} = req.body;
         if(!id)messageFalse(res,"Dados enviados incorretamente");*/
         const idUser = req.user.id;
        const information = await transactionInformation(idUser);
        if(!information)return messageFalse(res,"As informações de transações não foram encontradas");

        return res.status(200).json({success:true , resume:information.resume, category:information.category});
        
       } catch (error) {
         console.log("erro ao buscar informações sobre as transações: ", error);
         return messageFalse(res,"Falha ao buscar infifrções sobre as transações");
       } 
    }

    async create(req,res){

        try {
          //console.log("cheguei na api");
           //console.log("o que veio no corpo da requesição: ", req.body);
            const{type,value,category,subCategory,description,monthFrequency,startDate,endDate}=req.body;
            if(!type || !value || !category || monthFrequency === undefined || !startDate )return messageFalse(res,"dados enviados incorretamente");
            const typeEntryExit = type === "Saída" ? 1 :0;  
            const userId = req.user.id;
            
            const result = await createTransaction(userId,typeEntryExit,value,category,subCategory,description,monthFrequency,startDate,endDate)

            if(!result)return messageFalse(res,"não foi possivel criar nova transação");

            return res.status(201).json({success:true, message:"Transação criada com sucesso"});

        } catch (error) {
            console.log("Erro ao criar nova transação: ", error);
            return messageFalse(res,"Falha ao criar nova transação");
        }
    }

    async readTransaction(req,res){

        try {
           /* const{idUser} = req.body;
            if(!idUser)return messageFalse(res,"Dados enviado incorretamete");*/
            const idUser = req.user.id;

            const transactionHistory = await readTransaction(idUser);
            if(!transactionHistory)return messageFalse(res,"não foi possivel ler as transações do usuário");

            return res.status(200).json({success:true, transaction: transactionHistory});
            
        } catch (error) {
            console.log("Erro ao ler todas transações do usuário: ",error);
            return messageFalse(res,"falha ao ler estrato de transações");
        }
    }
    
    
}