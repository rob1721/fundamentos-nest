import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CConfigService {
  constructor(private readonly config: ConfigService) {}

  get port(): number {
    return parseInt(process.env['PORT']) || 3000;
  }

  get environment(): string {
    return process.env['NODE_ENV'] || 'development';
  }
}
