import express from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    getMyPosts,
    getPostBySlug,
    updatePost
} from '../Controller/postController.js';
import { isLogin } from '../middleware/isLogin.js';
import { authorize } from '../middleware/authorize.js';
const postRouter = express.Router();
postRouter.post('/', isLogin, authorize('user'), createPost);
postRouter.get('/', isLogin, getAllPosts);
postRouter.get('/slug/:slug', isLogin, getPostBySlug);
postRouter.get('/myPost', isLogin, getMyPosts);
postRouter.delete('/:id', isLogin, deletePost);
postRouter.put('/:id', isLogin, updatePost);

export default postRouter;