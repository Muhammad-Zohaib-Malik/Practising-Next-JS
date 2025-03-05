
import jwt from 'jsonwebtoken'
import { NextResponse as res } from 'next/server'
export const POST = async (req) => {
  try {
    const { token } = await req.json()
    const session = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!session) {
      return res.json({ error: 'Invalid token' }, { status: 401 })
    }
    return res.json({ session })

  } catch (error) {
    return res.json({ error: error.message }, { status: 401 })

  }

}