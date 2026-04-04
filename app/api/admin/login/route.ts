import { NextRequest, NextResponse } from "next/server"
import { createSessionToken, ADMIN_COOKIE } from "@/lib/utils/admin-auth"

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 500 }
      )
    }

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 })
    }

    const token = await createSessionToken(username)

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return response
  } catch (err) {
    console.error("[admin/login]", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
