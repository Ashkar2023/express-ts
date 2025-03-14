import { SignJWT, jwtVerify, decodeJwt, JWTPayload, JWTVerifyResult } from "jose"

export type TokenType = "ACCESS" | "REFRESH" | "PWD_RESET";

export const REFRESH_TOKEN_SPAN = "1 day";
export const ACCESS_TOKEN_SPAN = "5 minutes";
export const PWD_RESET_TOKEN_SPAN = "3 minutes";


export const encodeSecret = (secret: string): Uint8Array =>
    new TextEncoder().encode(secret);

export async function signJWT({ payload, secret, tokenType }: {
    payload: any,
    secret: string,
    tokenType: TokenType
})
    : Promise<string> {

    let currentSpan: string;

    switch (tokenType) {
        case "REFRESH":
            currentSpan = REFRESH_TOKEN_SPAN;
            break;
        case "ACCESS":
            currentSpan = ACCESS_TOKEN_SPAN;
            break;
        case "PWD_RESET":
            currentSpan = PWD_RESET_TOKEN_SPAN;
            break;
        default:
            throw new Error("Invalid Token Type")
    }

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(currentSpan)
        .sign(encodeSecret(secret))

    return jwt;
}

export async function verifyJWT({ jwt, secret }: {
    jwt: string,
    secret: string,
})
    : Promise<JWTVerifyResult> {
    try {
        const encodedSecret = encodeSecret(secret);
        const JwtPayload = await jwtVerify(
            jwt,
            encodedSecret,
        );
        return JwtPayload;

    } catch (error) {
        if (error instanceof Error) console.log("error from @common/token handler :\n", error.message);
        throw error
    }

}

// export function validateJWT(token: string) {
//     throw new Error("Validate token method not implemented!")
// }

export function decodeJWT(jwt: string) {
    const decoded = decodeJwt(jwt);

    return decoded;
}