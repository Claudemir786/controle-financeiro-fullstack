import pool from "./database.js";
const pools = pool;


//buscar saldo total,gastos do mês, total de entrada

//numerar por categoria os maiores gastos
export async function transactionInformation(id){
    try {

        //primeira query(dados do mês);
        const [row1] = await pools.query(`SELECT
                                                SUM(CASE WHEN type = 0 THEN value ELSE 0 END) AS totalEntradas,
                                                SUM(CASE WHEN type = 1 THEN value ELSE 0 END) AS totalSaidas,
                                                SUM(CASE 
                                                    WHEN type = 0 THEN value 
                                                    WHEN type = 1 THEN -value 
                                                    ELSE 0 
                                                END) AS saldo
                                            FROM transaction
                                            WHERE userId = ?
                                            AND active = TRUE
                                            AND startDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
                                            AND startDate <  DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
                                        `, [id]);
    
    //segunda query(gastos por categoria)
        const [row2] = await pools.query(`SELECT
                                            category,
                                            SUM(value) AS total
                                        FROM transaction
                                        WHERE userId = ?
                                        AND type = 1
                                        AND active = TRUE
                                        AND startDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
                                        AND startDate <  DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
                                        GROUP BY category
                                        ORDER BY total DESC;
                                        `,[id]);

        if(row1.length ===0 || row2 ===0)throw new Error("Dados não retornaram corretamente do banco");
        
        return {
            resume:row1[0],
            category:row2
        }                                    

        
    } catch (error) {
        console.log("não foi possivel retornar as informações de transação: ", error);
        return false
    }
}

export async function createTransaction(userId,type,value,category,subCategory,description,monthFrequency,startDate,endDate){
    try {
        
        const [result] = await pools.query(`INSERT INTO transaction(userId,type,value,category,description,monthFrequency,startDate,endDate,active,subCategory)VALUES
                                            (?,?,?,?,?,?,?,?,?,?) `,[userId,type,value,category,description,monthFrequency,startDate,endDate,true,subCategory,]);

                                          
         if(result.affectedRows !==1)throw new Error("a query falhou, não retornou os dados corretamente");
         
         return true;
        
    } catch (error) {
        console.log("Falha ao tentar criar nova transação no banco: ", error);
        return false;
    }
}

export async function readTransaction(id){
    try {

        const [row] = await pools.query(`SELECT category, value, type
                                        FROM \`transaction\`
                                        WHERE userId = ?
                                        AND startDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
                                        AND startDate <  DATE_ADD(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 1 MONTH)
                                        AND active = TRUE`,
                                        [id]);

        if(row.length === 0 )throw new Error("Falha ao executar a query no banco de dados, não retornou nada");
        return row;
        
    } catch (error) {
        console.log("Falha ao ler hostórico de transações: ", error);
        return false;
    }
}