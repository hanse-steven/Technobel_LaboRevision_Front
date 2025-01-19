export interface JwtPayload {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
    aud: string
    iss: string
    exp: number
}
