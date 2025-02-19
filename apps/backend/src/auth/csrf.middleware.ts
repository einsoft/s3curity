import * as csurf from 'csurf';
import { NextFunction, Request, Response } from 'express';

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private csrfProtection: any;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    
    this.csrfProtection = csurf({
      cookie: {
        key: '_csrf',
        path: '/',
        httpOnly: true,
        sameSite: 'lax', // Changed from strict to lax for better compatibility
        secure: isProduction,
        domain: isProduction ? '.s3curity.com' : undefined, // Add domain for production
        maxAge: 60 * 60 * 24, // 1 day expiration
      },
      ignoreMethods: ['GET', 'HEAD', 'OPTIONS'], // Explicitly define ignored methods
      value: (req) => {
        // Custom token retrieval logic
        const token = req.headers['x-csrf-token'] || req.body._csrf;
      if (token) {
        try {
          // Decode and verify basic structure
          const decoded = Buffer.from(token, 'base64').toString('utf-8');
          JSON.parse(decoded);
          return token;
        } catch (error) {
          console.warn('Invalid CSRF token format:', error.message);
        }
      }
      return null;
      }
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    // Skip CSRF protection for auth routes (both with and without /api prefix)
    // Skip CSRF protection for GET requests and auth routes
    const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
const safePaths = new Map([
  ['/auth/login', ['POST']],
  ['/auth/refresh-token', ['POST']],
  ['/usuario/:id/alterarNome', ['PATCH']],
]);

    const isSafePath = Array.from(safePaths.entries()).some(([path, methods]) => {
        const pathMatch = (() => {
          if (path.includes(':id')) {
            // Create regex pattern for ID routes
            const regex = new RegExp(`^${path.replace(':id', '\\d+')}$`);
            return regex.test(req.path);
          }
          return req.path === path;
        })();
      
      return pathMatch && (methods.length === 0 || methods.includes(req.method));
    });

    if (safeMethods.includes(req.method) || isSafePath) {
      next();
      return;
    }
    
    this.csrfProtection(req, res, next);
  }
}
