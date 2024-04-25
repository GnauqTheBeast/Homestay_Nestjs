import * as bcrypt from "bcrypt";

export function hashPassword(myPlaintextPassword: string) {
    const saltRounds = +process.env.SAlT_ROUNDS;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    
    return hash;
}