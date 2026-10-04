import db from "../Config/db.js";


export const registerUserService = async (username, email, password, phone, role) => {
    const query = 'INSERT into users(username , email , password , phone ,  role) VALUES( ? , ? , ? , ? , ? ) ';
    const [user] = await db.execute(query, [username, email, password, phone, role]);
    return user;
}
export const findUserByEmailService = async (email) => {
    const query = 'SELECT * FROM users WHERE email=?';
    const [row] = await db.execute(query, [email]);
    return row[0] || null;
}
export const findMeService = async (id) => {
    const query = ' SELECT * FROM users WHere id = ?';
    const [row] = await db.execute(query, [id]);
    return row[0] || null;

}
export const findUserByIdService = async (id) => {
    const query = ' SELECT id , role FROM users WHERE id = ?';
    const [row] = await db.execute(query, [id]);
    return row[0] || null;
}

export const getAllUsersServices = async () => {
    const [rows] = await db.execute(`SELECT * FROM users ORDER By id Desc`, []);
    return rows;
}

export const deleteUserByIdServices = async (id) => {
    const query = `DELETE FROM users where id = ? `;
    const [rows] = await db.execute(query, [id]);
    return rows.affectedRows > 0;
}