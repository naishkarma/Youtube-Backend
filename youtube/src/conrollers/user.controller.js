import {asyncHandler} from "../utils/asynHandler.js";
import {ApiError, apiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
 import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res) => {
   // get user details from fontend
   // validation - not empty
   // check if user already exists - username, email
   // check avatar and Image
   // upload them to cloudinary, check avatar
   // create user object  - create entry in db
   // remove password and refresh token field from response
   // check for user create or Null
   // return response.

   const {fullName, email, username, password} = req.body

   console.log('email :', email);
   
   if([ fullName, email, username, password].some((field)=>field.trim()===""))
    {
    throw new ApiError(400, "All Field are required")
   }

   const existedUser = User.findOne({
    $or: [{username}, {email}]
   })
   if(existedUser){ throw new ApiError(409, "User exits with username or email")}

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.file?.coverImage[0]?.path;

   if(!avatarLocalPath){ throw new apiError(400, "Avatar files is required")}


   const avatar = await uploadonCloudinary(avatarLocalPath)
   const coverImage = await uploadonCloudinary(coverImageLocalPath)

   if(!avatar){throw new apiError(400, "Avatar files is required")}

   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createdUser){
      throw new apiError(500, "Some thing went wrong while registering the user")
   }

   return res.status(201).json(
      new ApiResponse(200), createdUser, "User Registered Successfully"
   )
   

}) 

export {registerUser} 