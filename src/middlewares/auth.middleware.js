import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHaldler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";



export const verifyJWT = asyncHaldler(async (req, _, next) => {
    
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user) {
            // TODO : DISCUSS ABOUT FRONTEND
            throw new ApiError(401, "Invalid Access Token")
        }
    
        Request.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }


})