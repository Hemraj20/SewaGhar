import express from 'express';
import { deleteUserById, getAllUsers, getMe, loginUser, logOut, registerUser } from '../Controller/authController.js';
import { isLogin } from '../middleware/isLogin.js';
import { authorize } from '../middleware/authorize.js';
const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/me', isLogin, getMe);
authRouter.post('/logout', logOut);
authRouter.delete('/delete/:id', isLogin, authorize('admin'), deleteUserById);
authRouter.get('/users', isLogin, getAllUsers);

export default authRouter;