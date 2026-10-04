import { ErrorResponse } from "../utils/appErrors.js";

export const authorize = (...roles) => {
    return (req, res, next) => {
        const allowRoles = roles.map(role => role.toLowerCase());
        const userRole = req.user.role.toLowerCase();
        if (!allowRoles.includes(userRole)) {
            return next(new ErrorResponse('you are not authorize to access this routes', 403));
        }
        next();
    }
}