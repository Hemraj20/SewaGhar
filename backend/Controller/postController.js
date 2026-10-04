
import asyncHandler from "express-async-handler";
import { ErrorResponse } from '../utils/appErrors.js';
import { generateSlug } from '../utils/generateSlug.js';
import { createPostService, deletePostService, findPostServiceByIdServices, getAllPostsService, getMyPostsService, getPostBySlugService, updatePostService } from "../services/postServices.js";

export const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        location,
        budget
    } = req.body;

    const userId = req.user.id;

    const slug = generateSlug(title);
    const postId = await createPostService(
        title,
        description,
        location,
        budget,
        userId,
        slug
    );

    res.status(201).json({
        success: true,
        message: "Service post created successfully",
        postId
    });
});

export const getAllPosts = asyncHandler(async (req, res) => {
    const { location, search } = req.query;

    const posts = await getAllPostsService({ location, search });

    res.status(200).json({
        success: true,
        count: posts.length,
        posts,
    });
});

export const getPostBySlug = asyncHandler(async (req, res, next) => {
    const { slug } = req.params;

    const post = await getPostBySlugService(slug);

    if (!post) {
        return next(new ErrorResponse('post not found', 404))
    }

    res.status(200).json({
        success: true,
        post,
    });
});

export const getMyPosts = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const posts = await getMyPostsService(userId);

    res.status(200).json({
        success: true,
        count: posts.length,
        posts,
    });
});
export const deletePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;
    if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        return next(new ErrorResponse("Invalid post ID", 400));
    }
    const isPostExist = await findPostServiceByIdServices(id);
    if (!isPostExist) {
        return next(new ErrorResponse('post not found', 404));
    }
    const deleted = await deletePostService(id, userId, role);

    if (!deleted) {
        return next(new ErrorResponse("not authorize to delete the post", 404));
    }

    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
});

export const updatePost = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;
    const role = req.user.role;



    const { title, description, location, budget } = req.body;
    const slug = title ? generateSlug(title) : undefined;

    const updated = await updatePostService(id, userId, role, {
        slug,
        title,
        description,
        location,
        budget,
    });

    if (!updated) {
        return next(new ErrorResponse("post not found or not authorized", 404));
    }

    res.status(200).json({
        success: true,
        message: "Post updated successfully",
    });
});
