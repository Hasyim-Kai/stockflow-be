import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/domain/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) { }

  // async validateUser(username, pass) {
  //   const user = await this.userService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ userId: number, access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      userId: user.userId,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyJwt(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verify(token, {
        secret: this.config.get<string>('JWT_SECRET'), // Replace with your secret key environment variable
      });
      return decoded; // Return decoded payload if valid
    } catch (error) {
      // Handle JWT verification errors (e.g., expired token, invalid signature)
      throw new UnauthorizedException('Invalid JWT token');
    }
  }
}