import express from 'express';
import { createService, deleteService, getAllServices, getServiceById, updateService } from '../Controller/serviceController.js';
import { isLogin } from '../middleware/isLogin.js';
import { authorize } from '../middleware/authorize.js';
const serviceRouter = express.Router();
serviceRouter.post('/',isLogin, authorize('admin') , createService);
serviceRouter.get('/',isLogin, authorize('admin') ,  getAllServices);
serviceRouter.get('/:id',isLogin, authorize('admin') ,  getServiceById);
serviceRouter.put('/:id',isLogin , authorize('admin') , updateService);
serviceRouter.delete('/:id', isLogin , authorize('admin') , deleteService);

export default serviceRouter;