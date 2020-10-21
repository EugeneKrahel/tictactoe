import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../models/game.entity';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), TagsModule],
  providers: [GamesService],
  controllers: [GamesController],
  exports: [],
})
export class GamesModule {
}
