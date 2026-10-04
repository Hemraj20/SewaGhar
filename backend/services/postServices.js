import db from "../Config/db.js";
export const createPostService = async (
    title,
    description,
    location,
    budget,
    userId,
    slug
) => {
    const query = `
        INSERT INTO service_posts
            (title, description, location, budget, user_id, slug)
        VALUES (?, ?, ?, ?, ?, ?) `;
    const [result] = await db.execute(query, [
        title,
        description,
        location,
        budget,
        userId,
        slug,
    ]);
    if (result.affectedRows !== 1) {
        throw new ErrorResponse("Failed to create service post", 500);
    }
    return result.insertId;
}

export const getAllPostsService = async ({ service_id, location, search } = {}) => {
    const conditions = [];
    const params = [];

    if (location) {
        conditions.push("sp.location LIKE ?");
        params.push(`%${location}%`);
    }

    if (search) {
        conditions.push("(sp.title LIKE ? OR sp.description LIKE ?)");
        params.push(`%${search}%`, `%${search}%`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [posts] = await db.execute(
        `SELECT 
            sp.id,
            sp.title,
            sp.description,
            sp.location,
            sp.budget,
            sp.slug,
            sp.created_at,
            u.username
         FROM service_posts sp
         JOIN users u ON sp.user_id = u.id
         ${where}
         ORDER BY sp.created_at DESC`,
        params
    );

    return posts;
};

export const getPostBySlugService = async (slug) => {
    const [rows] = await db.execute(
        `SELECT id, title, description, location, budget, user_id, slug, created_at
         FROM service_posts
         WHERE slug = ?
         LIMIT 1`,
        [slug]
    );

    return rows[0] || null;
};
export const getMyPostsService = async (userId) => {
    const [rows] = await db.execute(
        `SELECT id, title, description, location, budget, user_id, slug, created_at
         FROM service_posts
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId]
    );

    return rows;
};


export const deletePostService = async (postId, userId, role) => {
    let query;
    let params;

    if (role === "admin") {
        query = `
            DELETE FROM service_posts
            WHERE id = ?
        `;

        params = [postId];
    } else {
        query = `
            DELETE FROM service_posts
            WHERE id = ? AND user_id = ?
        `;

        params = [postId, userId];
    }

    const [result] = await db.execute(query, params);

    return result.affectedRows > 0;
};



export const updatePostService = async (postId, userId, role, data) => {
    const fields = [];
    const params = [];
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            fields.push(`${key} = ?`);
            params.push(value);
        }
    });
    if (fields.length === 0) {
        return false;
    }

    let query;

    if (role === "admin") {
        query = `
            UPDATE service_posts
            SET ${fields.join(", ")}
            WHERE id = ?
        `;

        params.push(postId);
    } else {
        query = `
            UPDATE service_posts
            SET ${fields.join(", ")}
            WHERE id = ? AND user_id = ?
        `;

        params.push(postId, userId);
    }

    const [result] = await db.execute(query, params);

    return result.affectedRows > 0;
};

export const findPostServiceByIdServices = async (id) => {
    const query = `SELECT * FROM services WHERE id=?`;
    const [result] = await db.execute(query, [id]);
    return result[0]
}
