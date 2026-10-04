import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../utils/appErrors.js';
import { createVendorService, deleteVendorService, findExistingVendorService, findVendorByIdService, findVendorBySlugService, getAllVendorsService, updateVendorService } from '../services/vendorService.js';
import { findUserByIdService } from '../services/authServices.js';
import { generateSlug } from '../utils/generateSlug.js';

export const createVendor = asyncHandler(async (req, res, next) => {
    const { name, address, service_id, user_id, number } = req.body || {};
    if (!name) {
        return next(new ErrorResponse('name is requires', 400));
    }
    if (!address) {
        return next(new ErrorResponse('address is requires', 400));
    }
    if (!service_id) {
        return next(new ErrorResponse('serviceId is requires', 400));
    }
    if (!number) {
        return next(new ErrorResponse('number  is requires', 400));
    }
    if (!user_id) {
        return next(new ErrorResponse('userId is requires', 400));
    }
    const isVendorExist = await findExistingVendorService(user_id);
    const isUserExist = await findUserByIdService(user_id);
    
    if (isVendorExist) {
        return next(new ErrorResponse('this user is already registered as the vendor', 400));
    }
    if (!isUserExist) {
        return next(new ErrorResponse('user does not exist', 404));
    }
    // if (!isServiceExist) {
    //     return next(new ErrorResponse('service does not exist ', 404));
    // }


    const vendor = await createVendorService(name, address, service_id, user_id, number);
    if (vendor.affectedRows === 0) {
        return next(new ErrorResponse('unable to create vendor ', 400));
    }
    res.status(201).json({
        message: 'vendor is created successfully',
        vendor
    })

});

export const getAllVendors = asyncHandler(async (req, res, next) => {
    const vendors = await getAllVendorsService();

    if (!vendors || vendors.length === 0) {
        return next(new ErrorResponse('No vendors found', 404));
    }

    res.status(200).json({
        message: 'Vendors retrieved successfully',
        count: vendors.length,
        vendors

    });
});
export const getVendorById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const vendor = await findVendorByIdService(id);

    if (!vendor) {
        return next(new ErrorResponse('Vendor not found', 404));
    }

    res.status(200).json({
        message: 'Vendor retrieved successfully',
        vendor
    });
});

export const getVendorBySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;

    const vendor = await findVendorBySlugService(slug);

    if (!vendor) {
        return next(new ErrorResponse('Vendor not found', 404));
    }

    res.status(200).json({
        message: 'Vendor retrieved successfully',
        vendor
    });
});

export const deleteVendor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const result = await deleteVendorService(id);

    if (result.affectedRows === 0) {
        return next(new ErrorResponse('Vendor not found', 404));
    }

    res.status(200).json({
        message: 'Vendor deleted successfully'
    });
});

export const updateVendor = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, address, service_id, number } = req.body || {};

    if (!id) {
        return next(new ErrorResponse('vendor id is required', 400));
    }

    // At least one updatable field must be sent
    if (
        name === undefined &&
        address === undefined &&
        service_id === undefined &&
        number === undefined
    ) {
        return next(new ErrorResponse('provide at least one field to update', 400));
    }

    // Reject empty values for the fields that were sent
    if (name !== undefined && !String(name).trim()) {
        return next(new ErrorResponse('name cannot be empty', 400));
    }
    if (address !== undefined && !String(address).trim()) {
        return next(new ErrorResponse('address cannot be empty', 400));
    }
    if (number !== undefined && !String(number).trim()) {
        return next(new ErrorResponse('number cannot be empty', 400));
    }
    if (service_id !== undefined && !service_id) {
        return next(new ErrorResponse('serviceId cannot be empty', 400));
    }

    const vendor = await findVendorByIdService(id);
    if (!vendor) {
        return next(new ErrorResponse('vendor does not exist', 404));
    }

    if (service_id !== undefined) {
        const isServiceExist = await findServiceExistService(service_id);
        if (!isServiceExist) {
            return next(new ErrorResponse('service does not exist', 404));
        }
    }

    // Build only the fields that were sent (user_id is intentionally not updatable)
    const fields = {};
    if (name !== undefined) {
        fields.name = String(name).trim();
        
    }
    if (address !== undefined) fields.address = String(address).trim();
    if (service_id !== undefined) fields.service_id = service_id;
    if (number !== undefined) fields.number = number;

    const result = await updateVendorService(id, fields);
    if (result.affectedRows === 0) {
        return next(new ErrorResponse('unable to update vendor', 400));
    }

    const updatedVendor = await findVendorByIdService(id);

    res.status(200).json({
        message: 'vendor is updated successfully',
        vendor: updatedVendor
    });
});