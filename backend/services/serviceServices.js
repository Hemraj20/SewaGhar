import db from "../Config/db.js";
import { ErrorResponse } from "../utils/appErrors.js";

export const createServiceService = async (name, description) => {
        const [result] = await db.execute(
            `INSERT INTO services (name, description) VALUES (?, ?)`,
            [name, description ?? null]
        );
        return result;
};
export const getAllServicesService = async () => {
    const [rows] = await db.execute(
        `SELECT id, name, description
         FROM services
         ORDER BY name ASC`
    );

    return rows;
};

export const getServiceByIdService = async (id) => {
    const [rows] = await db.execute(
        `SELECT id, name, description
         FROM services
         WHERE id = ?
         LIMIT 1`,
        [id]
    );

    return rows[0] || null;
};

// Returns the raw mysql2 result. Fields not sent keep their old value.
export const updateServiceService = async (id, name, description) => {
    try {
        const [result] = await db.execute(
            `UPDATE services
             SET name        = COALESCE(?, name),
                 description = COALESCE(?, description)
             WHERE id = ?`,
            [name ?? null, description ?? null, id]
        );

        return result;
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new ErrorResponse("Service already exists", 409);
        }

        throw error;
    }
};

// Returns the raw mysql2 result.
export const deleteServiceService = async (id) => {
    try {
        const [result] = await db.execute(
            `DELETE FROM services WHERE id = ?`,
            [id]
        );

        return result;
    } catch (error) {
        // Posts still reference this service (foreign key)
        if (error.code === "ER_ROW_IS_REFERENCED_2") {
            throw new ErrorResponse("Service is used by existing posts and cannot be deleted", 409);
        }

        throw error;
    }
};