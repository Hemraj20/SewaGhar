import asyncHandler from 'express-async-handler'
import { ErrorResponse } from '../utils/appErrors.js';
import { deleteUserByIdServices, findMeService, findUserByEmailService, findUserByIdService, getAllUsersServices, registerUserService } from '../services/authServices.js';
import { passwordHashing } from '../utils/bcryptHashed.js';
import { generateToken } from '../utils/generateToken.js';
import { isMatching } from '../utils/passwordMatching.js';
export const registerUser = asyncHandler(async (req, res, next) => {
   const { username, email, password, phone, address, role } = req.body || {};

   if (!username) {
      return next(new ErrorResponse('username is required', 400));
   }
   if (!email) {
      return next(new ErrorResponse('email is required', 400));
   }
   if (!password) {
      return next(new ErrorResponse('password is required', 400));
   }
   if (!role) {
      return next(new ErrorResponse('role is required', 400));
   }

   const hashedPassword = await passwordHashing(password);

   const user = await registerUserService(username, email, hashedPassword, phone, role);
   if (user.affectedRows === 0) {
      return next(new ErrorResponse('unable to create user', 400));
   }
   const currentUser = {
      id: user.insertId,
      username,
      email,
      phone,
      role,

   }
   sendToken(res, currentUser);

});


export const loginUser = asyncHandler(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email) {
      return next(new ErrorResponse('email is required', 400));
   }
   if (!password) {
      return next(new ErrorResponse('password is required', 400));

   }
   const user = await findUserByEmailService(email);
   if (!user) {
      return next(new ErrorResponse('user not found', 404));
   }
   const isMatch = await isMatching(password, user.password);
   if (!isMatch) {
      return next(new ErrorResponse('Invalid credential !', 401));
   }
   const { password: _, ...loggedUserInfo } = user;
   sendToken(res, loggedUserInfo);

})


const sendToken = (res, user) => {
   const token = generateToken(user);
   res.status(201)
      .cookie('token', token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax',
         maxAge: Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000

      })
      .json({
         message: 'user register successFully',
         token,
         user
      })

}

export const getMe = asyncHandler(async (req, res, next) => {
   if (!req.user) {
      return next(new ErrorResponse('you are not logged in , please login first', 401));
   }
   const user = await findMeService(req.user.id);
   if (!user) {
      return next(new ErrorResponse('user does not exist ', 404));
   }
   const { password: _, ...loggedUserInfo } = user;
   res.status(200).json({
      message: 'user is retrieved successfully',
      loggedUserInfo
   })

});

export const logOut = asyncHandler(async (req, res, next) => {
   res.clearCookie('token');
   res.status(200).json({
      success: true,
      message: 'user logout succefuuly'
   });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await getAllUsersServices();

   res.status(200).json({
      message: 'all users are retrieved successfully',
      count: users.length,
      users
   })

});

export const deleteUserById = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   const isUserExist = await findUserByIdService(id);
   if (!isUserExist) {
      return next(new ErrorResponse('user not found', 404));
   }
   const user = await deleteUserByIdServices(id);
   if (!user) {
      return next(new ErrorResponse('unable to delete user', 500));
   }
   res.status(200).json({
      message: 'user delete succefully'
   })

})
