import { Injectable } from '@nestjs/common';
import { apiTitle, version } from "./conf/configuration";

@Injectable()
export class AppService {
  root(): string {
    return '{ "title": "'+apiTitle+'", "version": "'+version+'" }';
  }
}
