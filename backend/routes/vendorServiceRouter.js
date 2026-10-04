import express from 'express';
import { authorize } from '../middleware/authorize.js';
import { isLogin } from '../middleware/isLogin.js';
import {
    createVendorService,
    deleteMyVendorServiceController,
    getAllVendorService,
    getMyVendorServiceController,
    getVendorServiceById,
    getVendorServiceBySlugController
} from '../Controller/vendorServiceController.js';
const vendorServiceRouter = express.Router({
    mergeParams: true,
});

vendorServiceRouter.post('/', isLogin, authorize('vendor'), createVendorService);
vendorServiceRouter.get('/', isLogin, getAllVendorService);
vendorServiceRouter.get('/:id', isLogin, getVendorServiceById);
vendorServiceRouter.get('/slug/:slug', isLogin, getVendorServiceBySlugController);
vendorServiceRouter.get('/my-service', isLogin, getMyVendorServiceController);
vendorServiceRouter.delete('/:id', isLogin, deleteMyVendorServiceController);


export default vendorServiceRouter;