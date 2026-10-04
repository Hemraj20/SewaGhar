import db from "../Config/db.js";
import { ErrorResponse } from "../utils/appErrors.js";

export const createVendorServiceServices = async (
    vendorId,
    title,
    description,
    location,
    price,
    slug
) => {

    const [result] = await db.query(
        `INSERT INTO vendor_service_posts
        (
            vendor_id,
            title,
            description,
            location,
            price,
            slug
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            vendorId,
            title,
            description,
            location || null,
            price || null,
            slug
        ]
    );

    return result.insertId;
};

export const getAllVendorServiceServices = async () => {

    const [rows] = await db.query(`
        SELECT
            vsp.id,
            vsp.vendor_id,
            vsp.slug,
            vsp.title,
            vsp.description,
            vsp.location,
            vsp.price,
            vsp.status,
            vsp.created_at,
            vsp.updated_at,
            v.name AS vendor_name
        FROM vendor_service_posts vsp
        INNER JOIN vendors v
            ON vsp.vendor_id = v.id
        ORDER BY vsp.created_at DESC
    `);

    return rows;
};

export const getVendorServiceByIdServices = async (serviceId) => {
    const [rows] = await db.query(
        `SELECT
            id,
            vendor_id,
            slug,
            title,
            description,
            location,
            price,
            status,
            created_at,
            updated_at
         FROM vendor_service_posts
         WHERE id = ?`,
        [serviceId]
    );

    return rows[0];
};

export const getVendorServiceBySlugServices = async (slug) => {
    const [rows] = await db.query(
        `SELECT
            vsp.id,
            vsp.vendor_id,
            vsp.slug,
            vsp.title,
            vsp.description,
            vsp.location,
            vsp.price,
            vsp.status,
            vsp.created_at,
            vsp.updated_at,
            v.name AS vendor_name
         FROM vendor_service_posts vsp
         INNER JOIN vendors v
            ON vsp.vendor_id = v.id
         WHERE vsp.slug = ?`,
        [slug]
    );

    return rows[0];
};

export const getMyVendorServiceServices = async (vendorId) => {
    const [rows] = await db.query(
        `SELECT
            vsp.id,
            vsp.vendor_id,
            vsp.slug,
            vsp.title,
            vsp.description,
            vsp.location,
            vsp.price,
            vsp.status,
            vsp.created_at,
            vsp.updated_at,
            v.name AS vendor_name
         FROM vendor_service_posts vsp
         INNER JOIN vendors v
            ON vsp.vendor_id = v.id
         WHERE vsp.vendor_id = ?
         ORDER BY vsp.created_at DESC`,
        [vendorId]
    );

    return rows;
};
export const deleteMyVendorServiceServices = async (serviceId, vendorId) => {

    const [result] = await db.query(
        `DELETE FROM vendor_service_posts
         WHERE id = ? AND vendor_id = ?`,
        [serviceId, vendorId]
    );

    return result.affectedRows;
};
export const deleteVendorServiceByIdServices = async (serviceId) => {

    const [result] = await db.query(
        `DELETE FROM vendor_service_posts
         WHERE id = ?`,
        [serviceId]
    );

    return result.affectedRows;
};


export const updateVendorServiceServices = async (
    serviceId,
    vendorId,
    updates
) => {

    const fields = Object.keys(updates);

    if (fields.length === 0) {
        return null;
    }

    // Check slug uniqueness before updating
    if (updates.slug) {

        const [existing] = await db.query(
            `SELECT id
             FROM vendor_service_posts
             WHERE slug = ? AND id != ?`,
            [updates.slug, serviceId]
        );

        if (existing.length > 0) {
            throw new ErrorResponse(
                "slug is already in use",
                409
            );
        }
    }

    const setClause = fields
        .map(field => `${field} = ?`)
        .join(", ");

    const values = fields.map(
        field => updates[field]
    );

    let query = `
        UPDATE vendor_service_posts
        SET ${setClause}
        WHERE id = ?
    `;

    const params = [
        ...values,
        serviceId
    ];

    // Vendor can update only their own service
    if (vendorId !== null && vendorId !== undefined) {
        query += ` AND vendor_id = ?`;
        params.push(vendorId);
    }

    const [result] = await db.query(
        query,
        params
    );

    return result.affectedRows;
};