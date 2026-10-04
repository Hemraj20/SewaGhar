import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../utils/appErrors.js';
import { errorHandler } from './errorHandler.js';
import jwt from 'jsonwebtoken';
export const isLogin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new ErrorResponse('please! login first', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
})