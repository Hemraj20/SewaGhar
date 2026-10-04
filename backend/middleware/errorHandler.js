export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'server Error !';
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 409;
        message = 'Duplicate entry. The value already exists.';
    }
    res.status(statusCode).json({
        success: false,
        message
    })
}