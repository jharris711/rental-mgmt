/**
 * Authentication utilities for password hashing and verification
 */

/**
 * Hash a password using Argon2id (Bun's default)
 * @param password - Plain text password
 * @returns Hashed password (includes salt internally)
 */
export async function hashPassword(password: string): Promise<string> {
    return await Bun.password.hash(password, {
        algorithm: "argon2id",
        memoryCost: 65536, // 64 MB
        timeCost: 3,       // 3 iterations
    })
}

/**
 * Verify a password against a hash
 * @param password - Plain text password to verify
 * @param hash - Hashed password from database
 * @returns True if password matches
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return await Bun.password.verify(password, hash)
}

/**
 * Generate a random salt (if needed for additional purposes)
 * Note: Bun.password.hash already includes salt internally
 * @param length - Length of salt in bytes (default: 32)
 * @returns Hex-encoded salt string
 */
export function generateSalt(length: number = 32): string {
    const buffer = new Uint8Array(length)
    crypto.getRandomValues(buffer)
    return Buffer.from(buffer).toString('hex')
}
