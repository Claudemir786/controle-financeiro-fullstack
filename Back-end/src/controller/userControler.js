

export class User{
    login(req,res){
        try {
            if(!req.body)res.status(401).json({success:false, message:"Corpo da requisição não encontrado"});
            
            const{email,password} = req.body;
            if(!email || !password)res.status(401).json({success:false, message:"dados enviados incorretamente"});

        } catch (err) {
            
        }
    }

    create(req,res){

    }

    alterEmail(req,res){

    }

    alterPassword(req,res){

    }
}