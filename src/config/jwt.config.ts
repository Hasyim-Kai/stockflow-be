import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

// export const jwtConfig: JwtModuleAsyncOptions = {
//     useFactory: () => {
//         return {
//             global: true,
//             secret: process.env.JWT_SECRET,
//             // signOptions: { expiresIn: '10s' },
//             signOptions: { expiresIn: '7d' },
//         }
//     }
// }

export const jwtConfig: JwtModuleOptions = {
    global: true,
    secret: process.env.JWT_SECRET,
    // signOptions: { expiresIn: '10s' },
    signOptions: { expiresIn: '7d' },
}
