import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { fullName, email, userName, password } = req.body;

  // Validate fields are not empty
  if([fullName,email,userName,password].some((field)=> {field===""})){
    throw new ApiError(400, "All fields are required");
  }
  // Check if user already exists by userName or email
  const existedUser = await User.findOne({
    $or: [{ userName: userName }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User exists with the same userName or email");
  }

  // Check for avatar file in request
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar and cover image to Cloudinary
  const avatar = await uploadonCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadonCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Error uploading avatar file");
  }

  // Create user in database
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  // Fetch created user without sensitive fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return success response
  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});

export { registerUser };
