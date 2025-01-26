// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

import { Usuario } from '@s3curity/core';

declare module 'express' {
  interface Request {
    usuario?: Usuario;
  }
}
