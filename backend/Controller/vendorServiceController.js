
import asyncHandler from "express-async-handler";
import { generateSlug } from "../utils/generateSlug.js";
import { createVendorServiceServices, deleteMyVendorServiceServices, deleteVendorServiceByIdServices, getAllVendorServiceServices, getMyVendorServiceServices, getVendorServiceByIdServices, getVendorServiceBySlugServices, updateVendorServiceServices } from "../services/vendorServiceServices.js";
import { ErrorResponse } from "../utils/appErrors.js";
import db from "../Config/db.js";

export const createVendorService = asyncHandler(async (req, res, next) => {

    const {
        title,
        description,
        location,
        price
    } = req.body || {};

    if (!title || !title.trim()) {
        return next(new ErrorResponse('title is required', 400));
    }

    if (!description || !description.trim()) {
        return next(new ErrorResponse('description is required', 400));
    }

    const userId = req.user.id;

    const vendorId = await findVendorIdServices(userId);
    if (!vendorId) {
        return next(new ErrorResponse('vendor not found', 404));
    }



    if (price !== undefined && price !== null && price !== "") {

        if (isNaN(price)) {
            return next(new ErrorResponse('price must be the valid number', 400));
        }

        if (Number(price) < 0) {
            return next(new ErrorResponse('price cannot be negative', 400));
        }
    }

    const slug = title ? generateSlug(title) : undefined;

    if (!slug) {
        res.status(400);
        throw new Error("Invalid title for generating slug");
    }

    const postId = await createVendorServiceServices(
        vendorId,
        title.trim(),
        description.trim(),
        location?.trim() || null,
        price === "" || price === undefined ? null : price,
        "active",
        slug
    );

    if (!postId) {
        return next(new ErrorResponse('unable to create vendor service', 500));
    }

    res.status(201).json({
        success: true,
        message: "Vendor service created successfully",
        postId
    });
});

export const getAllVendorService = asyncHandler(
    async (req, res, next) => {

        const posts = await getAllVendorServiceServices();

        if (!posts || posts.length === 0) {
            return next(
                new ErrorResponse(
                    "No vendor services found",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            count: posts.length,
            posts
        });
    }
);

export const getVendorServiceById = asyncHandler(
    async (req, res, next) => {

        const { id } = req.params;

        const service = await getVendorServiceByIdServices(id);

        if (!service) {
            return next(
                new ErrorResponse("Vendor service not found", 404)
            );
        }

        res.status(200).json({
            success: true,
            service
        });
    }
);
export const getVendorServiceBySlugController = asyncHandler(
    async (req, res, next) => {

        const { slug } = req.params;

        const service = await getVendorServiceBySlugServices(slug);

        if (!service) {
            return next(
                new ErrorResponse("Vendor service not found", 404)
            );
        }

        res.status(200).json({
            success: true,
            service
        });
    }
);

export const getMyVendorServiceController = asyncHandler(
    async (req, res, next) => {

        const vendorId = req.vendor.id;

        const services = await getMyVendorService(vendorId);

        if (!services || services.length === 0) {
            return next(
                new ErrorResponse(
                    "No vendor services found",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            count: services.length,
            services
        });
    }
);

export const deleteMyVendorServiceController = asyncHandler(
    async (req, res, next) => {

        const { id } = req.params;

        let deleted;

        if (req.user.role === "admin") {

            deleted = await deleteVendorServiceByIdServices(id);

        } else if (req.user.role === "vendor") {

            if (!req.vendor) {
                return next(
                    new ErrorResponse("Vendor authentication required", 401)
                );
            }

            deleted = await deleteMyVendorServiceServices(
                id,
                req.vendor.id
            );
        }

        if (!deleted) {
            return next(
                new ErrorResponse("Vendor service not found", 404)
            );
        }

        res.status(200).json({
            success: true,
            message: "Vendor service deleted successfully"
        });
    }
);




export const updateVendorServiceController = asyncHandler(
    async (req, res, next) => {

        const { id } = req.params;

        const {
            title,
            description,
            location,
            price
        } = req.body || {};

        if (!id) {
            return next(
                new ErrorResponse("service id is required", 400)
            );
        }

        const updates = {};

        if (title !== undefined) {

            if (!title.trim()) {
                return next(
                    new ErrorResponse("title cannot be empty", 400)
                );
            }

            updates.title = title.trim();
            updates.slug = generateSlug(title.trim());

            if (!updates.slug) {
                return next(
                    new ErrorResponse(
                        "Invalid title for generating slug",
                        400
                    )
                );
            }
        }

        if (description !== undefined) {

            if (!description.trim()) {
                return next(
                    new ErrorResponse(
                        "description cannot be empty",
                        400
                    )
                );
            }

            updates.description = description.trim();
        }

        if (location !== undefined) {
            updates.location = location?.trim() || null;
        }

        if (price !== undefined) {

            if (price !== null && price !== "") {

                if (isNaN(price)) {
                    return next(
                        new ErrorResponse(
                            "price must be a valid number",
                            400
                        )
                    );
                }

                if (Number(price) < 0) {
                    return next(
                        new ErrorResponse(
                            "price cannot be negative",
                            400
                        )
                    );
                }

                updates.price = price;

            } else {
                updates.price = null;
            }
        }

        if (Object.keys(updates).length === 0) {
            return next(
                new ErrorResponse(
                    "No fields provided to update",
                    400
                )
            );
        }

        let updated;

        if (req.user.role === "admin") {

            updated = await updateVendorServiceServices(
                id,
                null,
                updates
            );

        } else {

            if (!req.vendor) {
                return next(
                    new ErrorResponse(
                        "Vendor authentication required",
                        401
                    )
                );
            }

            updated = await updateVendorServiceServices(
                id,
                req.vendor.id,
                updates
            );
        }

        if (!updated) {
            return next(
                new ErrorResponse(
                    "Vendor service not found",
                    404
                )
            );
        }

        res.status(200).json({
            success: true,
            message: "Vendor service updated successfully"
        });
    }
);