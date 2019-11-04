import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { apiTitle, version } from './conf/configuration';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "{ "title": "' + apiTitle() + '", "version": "' + version() + '" }"', () => {
      expect(appController.root()).toBe('{ "title": "' + apiTitle() + '", "version": "' + version() + '" }');
    });
  });
});
