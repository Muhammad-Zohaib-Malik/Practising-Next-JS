import connectDB from "@/lib/db";
import { NextResponse as res } from "next/server";

export const GET = async () => {
  connectDB()
  return res.json({ message: "Hello World" });
}