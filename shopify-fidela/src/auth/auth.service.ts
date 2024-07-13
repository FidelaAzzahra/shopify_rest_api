import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AdminService } from '../admin/admin.service';
import { Admin } from '../admin/admin.schema';
import { RefreshToken, RefreshTokenDocument } from './refresh-token.schema';

@Injectable()
export class AuthService {
  private validTokens: Set<string> = new Set();

  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async validateAdmin(email: string, pass: string) {
    try {
      const admin = await this.adminService.findByEmail(email);
      const isValidPassword = await bcrypt.compare(pass, admin.password);
      if (admin && isValidPassword) {
        return admin;
      }
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Invalid credentials');
      return null;
    }
  }

  async login(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: admin.email, sub: admin };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    const refreshToken = await this.createRefreshToken(admin?._id as string);

    this.validTokens.add(accessToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(admin: Admin) {
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    return this.adminService.create({
      ...admin,
      password: hashedPassword,
    });
  }

  async logout(token: string) {
    this.validTokens.delete(token);
    await this.refreshTokenModel.deleteOne({ token });
    return { message: 'Logout successful' };
  }

  isTokenValid(token: string): boolean {
    return this.validTokens.has(token);
  }

  async createRefreshToken(adminId: string): Promise<string> {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // Refresh token valid for 7 days

    const refreshToken = new this.refreshTokenModel({
      admin: adminId,
      token: this.jwtService.sign({ sub: adminId }, { expiresIn: '7d' }),
      expires,
    });
    await refreshToken.save();
    return refreshToken.token;
  }

  async refreshTokens(refreshToken: string) {
    const existingToken = await this.refreshTokenModel.findOne({
      token: refreshToken,
    });

    if (!existingToken || new Date() > existingToken.expires) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const admin = await this.adminService.findOne(
      existingToken.admin.toString(),
    );
    if (!admin) {
      throw new UnauthorizedException('Admin not found');
    }

    const payload = { username: admin.email, sub: admin?._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const newRefreshToken = await this.createRefreshToken(admin?._id as string);

    this.validTokens.add(accessToken);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken,
    };
  }

  async deleteAdmin(id: string) {
    await this.refreshTokenModel.deleteMany({ admin: id });
    const admin = await this.adminService.delete(id);
    return admin;
  }
}
