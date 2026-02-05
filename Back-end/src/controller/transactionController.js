import { createTransaction, transactionInformation } from "../DAO/transactionDao.js";
import { messageFalse } from "./userControler.js";

export class Transaction{
    async info(req,res){
       try{   
         const{id} = req.body;
         if(!id)messageFalse(res,"Dados enviados incorretamente");
        const information = await transactionInformation(id);
        if(!information)messageFalse(res,"As informações de transações não foram encontradas");

        return res.status(200).json({success:true , resume:information.resume, category:information.category});
        
       } catch (error) {
         console.log("erro ao buscar informações sobre as transações: ", error);
         return messageFalse(res,"Falha ao buscar infifrções sobre as transações");
       } 
    }

    async create(req,res){

        try {
            const{userId,type,value,category,subCategory,description,monthFrequency,startDate,endDate}=req.body;
            if(!userId || !type || !value || !category || !subCategory || !monthFrequency || !startDate )messageFalse(res,"dados enviados incorretamente");
            const typeEntryExit = type === "Saida" ? 1 :0;  

            const result = await createTransaction(userId,typeEntryExit,value,category,subCategory,description,monthFrequency,startDate,endDate)

            if(!result)messageFalse(res,"não foi possivel criar nova transação");

            return res.status(201).json({success:true, message:"Transação criada com sucesso"});

        } catch (error) {
            console.log("Erro ao criar nova transação: ", error);
            return messageFalse(res,"Falha ao criar nova transação");
        }
    }
    
    
}