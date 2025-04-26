import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../module/user/user.interface';
import { User } from '../module/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //checking if the token is given or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    //checking if the token is valid or not
    // invalid token

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { id, role, iat } = decoded;

    const user = await User.isUserExistByCustomId(id);

    //checking if the user is exist

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!!!');
    }
    //checing if the user is dieleted
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This User is Deleted Already');
    }
    //cheking if the user is blocked
    const status = user?.status;
    if (status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!!!');
    }

    // deactivating the previous token after the password been changed
    if (
      user.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      ))
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Session has ended!! Please Login again');
    }

    //checking if the role from the token is same as the role from the permitted roles
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // console.log(decoded)
    //* this req.user is to send decoded in every request and the decoded data is sent to every request to do this there is a type definition in interface index.d.ts
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
