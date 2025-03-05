import { NextResponse as res } from "next/server"

export const config = {
  matcher: '/admin/:path*',
}


export const middleware = (req) => {
  const cookie = req.cookies.get("accessToken")
  if (!cookie) {
    return res.redirect(new URL("/login", req.url))
  }
  return res.next()
}
