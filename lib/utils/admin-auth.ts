/**
 * Admin auth utilities — compatible with both Edge (middleware) and Node.js runtimes.
 * Uses Web Crypto API (globalThis.crypto.subtle) available in both environments.
 *
 * Token format:  <base64url-payload>.<hex-hmac-sha256-signature>
 * Payload: { sub: username, exp: unix-ms-timestamp }
 */

export const ADMIN_COOKIE = "cc_admin_session"
const SESSION_MS = 24 * 60 * 60 * 1000 // 24 hours

// ─── tiny base64url helpers (no Buffer — Edge safe) ──────────────────────────

function b64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function b64urlDecode(b64: string): string {
  return atob(b64.replace(/-/g, "+").replace(/_/g, "/"))
}

// ─── HMAC key ─────────────────────────────────────────────────────────────────

async function hmacKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  )
}

function hexEncode(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function hexDecode(hex: string): Uint8Array {
  const pairs = hex.match(/.{2}/g)
  if (!pairs) throw new Error("invalid hex")
  return new Uint8Array(pairs.map((b) => parseInt(b, 16)))
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Create a signed session token valid for SESSION_MS. */
export async function createSessionToken(username: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error("ADMIN_SECRET env var is not set")

  const payload = b64urlEncode(
    JSON.stringify({ sub: username, exp: Date.now() + SESSION_MS })
  )
  const key = await hmacKey(secret, "sign")
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  return `${payload}.${hexEncode(sigBuf)}`
}

/** Verify a session token. Returns true only if the HMAC is valid and it hasn't expired. */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  try {
    if (!token) return false
    const secret = process.env.ADMIN_SECRET
    if (!secret) return false

    const dot = token.lastIndexOf(".")
    if (dot === -1) return false

    const payload = token.slice(0, dot)
    const sigHex = token.slice(dot + 1)

    const key = await hmacKey(secret, "verify")
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      hexDecode(sigHex).buffer as ArrayBuffer,
      new TextEncoder().encode(payload)
    )
    if (!valid) return false

    const { exp } = JSON.parse(b64urlDecode(payload))
    return typeof exp === "number" && Date.now() < exp
  } catch {
    return false
  }
}
