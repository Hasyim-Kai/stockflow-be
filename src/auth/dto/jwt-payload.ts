export interface JwtPayloadType {
    userId: number,
    name: string,
    email: string,
    role: string,
    outletId: number
}

export interface SignInResType {
    userId: number,
    name: string,
    email: string,
    role: string,
    token: string
}