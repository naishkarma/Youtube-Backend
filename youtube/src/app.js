import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";


const app = express()
export {app};

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Use the correct environment variable
    credentials: true, // Allow cookies with CORS
  })
);

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static files
app.use(express.static("./public"));

// Cookie parser middleware
app.use(cookieParser());


// Routes import
import userRouter from "./routes/user.routes.js"



//Routes decleartion

//app.use("/users", userRouter)
app.use("/api/v1/users", userRouter)// for API



