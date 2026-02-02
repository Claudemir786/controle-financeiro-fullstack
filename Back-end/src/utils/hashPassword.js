import bcrypt from "bcrypt"

const salRounds = 10;

export async function hashPassword(password){
    return await bcrypt.hash(password, salRounds);
}

export async function comparePassword(password,passwordHash){

    return await bcrypt.compare(password,passwordHash);
}