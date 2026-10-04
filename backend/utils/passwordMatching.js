import bcrypt from 'bcrypt'
export const isMatching = (password , hashedPassword) => {
    return  bcrypt.compare(password , hashedPassword) ;  
}