import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { StatusCodes } from "http-status-codes";
import { NextResponse as res } from "next/server";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};

export const POST = async (req) => {
  await connectDB();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return res.json(
        { message: "Please provide both email and password" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json(
        { message: "Invalid email or password" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.json(
        { message: "Invalid email or password" },
        { status: StatusCodes.UNAUTHORIZED }
      );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken
      (user._id);

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: "Strict",
      path: "/",
    };


    const response = res
      .json(
        {
          message: "Login successful",
          user: { fullname: user.fullname, email: user.email },
          accessToken,
          refreshToken,
        },
        { status: StatusCodes.OK }
      );
    response.cookies.set("accessToken", accessToken, { ...options, maxAge: 15 * 60 });
    response.cookies.set("refreshToken", refreshToken, { ...options, maxAge: 15 * 60 });
    return response

  } catch (error) {
    return res.json(
      { message: "Server error", error: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
