import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<import("./dto/jwt-payload").SignInResType>;
    verifyJwt(tokenBody: Record<string, any>): Promise<import("./dto/jwt-payload").SignInResType>;
}
