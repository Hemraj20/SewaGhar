import bcrypt from 'bcrypt'
export const passwordHashing = async (passsword) => {
    return await bcrypt.hash(passsword, 10)
}