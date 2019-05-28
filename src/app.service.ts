import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return '{ "title": "Api Coffee Order", "version": "0.0.1" }';
  }
}
