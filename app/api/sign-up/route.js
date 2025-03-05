
import connectDB from "@/lib/db";
import { User } from "@/models/user.model";
import { StatusCodes } from "http-status-codes";
import { NextResponse as res } from "next/server";



export const POST = async (req) => {
  await connectDB();
  try {
    const { fullname, email, password } = await req.json();
    if (!fullname || !email || !password) {
      return res.json({ message: "Please fill in all fields" }, { status: StatusCodes.BAD_REQUEST });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { fullname }] });
    if (existingUser) {
      return res.json({ message: "User already exists" }, { status: StatusCodes.CONFLICT });
    }
    const newUser = new User({ fullname, email, password });

    await newUser.save();

    return res.json({ message: "User registered successfully" }, { status: StatusCodes.CREATED });

  } catch (error) {
    return res.json({ message: "Server error", error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};
