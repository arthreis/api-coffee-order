import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return '{ "title": "Api Coffee Order", "version": "d0.v0.3" }';
  }
}
