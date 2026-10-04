import asyncHandler from "express-async-handler";
import { ErrorResponse } from '../utils/appErrors.js';
import { generateSlug } from '../utils/generateSlug.js';
import { createServiceService, deleteServiceService, getAllServicesService, getServiceByIdService, updateServiceService } from "../services/serviceServices.js";

export const createService = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;
 
    if (!name || !name.trim()) {
        return next(new ErrorResponse("service name is required", 400));
    }
 
    const service = await createServiceService(name.trim(), description?.trim());
     if (service.affectedRows !== 1) {
            return next( new ErrorResponse("Failed to create service", 500));
        }
 
    res.status(201).json({
        success: true,
        message: "Service created successfully",
        serviceId:service.insertId
    });
});

export const getAllServices = asyncHandler(async (req, res, next) => {
    const services = await getAllServicesService();

    res.status(200).json({
        success: true,
        count: services.length,
        services,
    });
});

export const getServiceById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const service = await getServiceByIdService(id);

    if (!service) {
        return next(new ErrorResponse("service not found", 404));
    }

    res.status(200).json({
        success: true,
        service,
    });
});

export const updateService = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (name === undefined && description === undefined) {
        return next(new ErrorResponse("nothing to update", 400));
    }

    if (name !== undefined && !name.trim()) {
        return next(new ErrorResponse("service name cannot be empty", 400));
    }

    const result = await updateServiceService(id, name?.trim(), description?.trim());

    if (result.affectedRows === 0) {
        return next(new ErrorResponse("service not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Service updated successfully",
    });
});

export const deleteService = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await deleteServiceService(id);

    if (result.affectedRows === 0) {
        return next(new ErrorResponse("service not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Service deleted successfully",
    });
});