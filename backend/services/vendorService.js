import db from "../Config/db.js";
export const findVendorIdServices = async (id) => {
    const [result] = await db.query(
        `SELECT id FROM vendors WHERE user_id = ?`,
        [id]);
    return result[0]
}

export const findExistingVendorService = async (id) => {
    const query = 'SELECT * FROM vendors WHERE user_id = ?';
    const [row] = await db.execute(query, [id]);
    return row[0] || null;
}
export const createVendorService = async (name, address, serviceId, userId, number) => {
    const query = 'INSERT INTO vendors(name, address, service_id, user_id, number) VALUES(?, ? , ? , ? , ?)';
    const [row] = await db.execute(query, [name, address, serviceId, userId, number]);
    return row;
}
export const getAllVendorsService = async () => {
    const query = `
        SELECT 
            vendors.id,
            vendors.user_id,
            vendors.name,
            vendors.address,
            vendors.number,
            services.name AS service_name,
            vendors.created_at
        FROM vendors
        INNER JOIN services
            ON vendors.service_id = services.id
    `;

    const [rows] = await db.execute(query);

    return rows;
};
export const findVendorByIdService = async (id) => {
    const query = `
        SELECT * FROM vendors WHERE id = ?
    `;

    const [rows] = await db.execute(query, [id]);

    return rows[0] || null;
};

export const findVendorBySlugService = async (slug) => {
    const query = `
        SELECT * FROM vendors WHERE slug = ?
    `;

    const [rows] = await db.execute(query, [slug]);

    return rows[0] || null;
};
export const deleteVendorService = async (id) => {
    const query = 'DELETE FROM vendors WHERE id = ?';

    const [result] = await db.execute(query, [id]);

    return result;
};


// Column names come from the whitelist built in the controller,
// and all values are parameterized, so this is safe from SQL injection.
export const updateVendorService = async (id, fields) => {
    const keys = Object.keys(fields);
    const setClause = keys.map((key) => `${key} = ?`).join(', ');
    const values = keys.map((key) => fields[key]);

    const [result] = await db.query(
        `UPDATE vendors SET ${setClause} WHERE id = ?`,
        [...values, id]
    );
    return result;
};
