import * as crypto from 'crypto';
import { Request } from 'express';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '../db/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(private prisma: PrismaService) {}

  private generateRefreshToken(): string {
    return crypto.randomBytes(40).toString('hex');
  }

  async createRefreshToken(userId: number, req: Request) {
    const token = this.generateRefreshToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days expiration

    await this.prisma.refreshToken.create({
      data: {
        token,
        usuarioId: userId,
        expiresAt,
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip,
      },
    });

    return token;
  }

  async validateRefreshToken(token: string) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { usuario: true },
    });

    if (!refreshToken) {
      return null;
    }

    if (refreshToken.isRevoked || refreshToken.expiresAt < new Date()) {
      // If token is expired or revoked, clean it up
      await this.prisma.refreshToken.delete({
        where: { id: refreshToken.id },
      });
      return null;
    }

    return refreshToken;
  }

  async revokeRefreshToken(token: string) {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserTokens(userId: number) {
    await this.prisma.refreshToken.updateMany({
      where: { usuarioId: userId },
      data: { isRevoked: true },
    });
  }

  async rotateRefreshToken(oldToken: string, req: Request) {
    const refreshToken = await this.validateRefreshToken(oldToken);
    if (!refreshToken) {
      return null;
    }

    // Revoke the old token
    await this.revokeRefreshToken(oldToken);

    // Create a new token
    return this.createRefreshToken(refreshToken.usuarioId, req);
  }

  async cleanupExpiredTokens() {
    await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { isRevoked: true }],
      },
    });
  }
}
