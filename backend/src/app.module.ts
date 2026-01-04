import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { ConfigModule } from '@nestjs/config';
import youtubeConfig from './config/youtube.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [youtubeConfig]
    }),
    YoutubeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
