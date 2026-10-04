import express from 'express';
import { createVendor, deleteVendor, getAllVendors, getVendorById, getVendorBySlug, updateVendor } from '../Controller/vendorContorller.js';
import { isLogin } from '../middleware/isLogin.js';
import { authorize } from '../middleware/authorize.js';
import vendorServiceRouter from './vendorServiceRouter.js';
const vendorRouter = express.Router();
vendorRouter.use('/service', vendorServiceRouter);
vendorRouter.post('/', isLogin, createVendor);
vendorRouter.get('/', isLogin, getAllVendors);
vendorRouter.get('/:id', isLogin, getVendorById);
vendorRouter.get('/slug', getVendorBySlug);
vendorRouter.delete('/:id', isLogin, authorize('admin'), deleteVendor);
vendorRouter.put('/:id', isLogin, authorize('admin'), updateVendor);

export default vendorRouter;