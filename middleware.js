import { NextResponse as res } from "next/server"

export const config = {
  matcher: '/admin/:path*',
}


export const middleware = async (req) => {
  const cookie = req.cookies.get("accessToken")
  if (!cookie) {
    return res.redirect(new URL("/login", req.url))
  }
  const api = await fetch(`${process.env.server}/api/session`, {
    method: "POST",
    body: JSON.stringify({ token: cookie.value }),
    headers: {
      "Content-Type": "application/json",
    },
  })  
  if (!api.ok) {
    return res.redirect(new URL("/login", req.url))
  }
  return res.next()
}