import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameDto } from '../dto/game.dto';
import { TagConverter } from '../converters/tag.converter';
import { Game } from '../models/game.entity';
import { GameConverter } from '../converters/game.converter';

@Controller('games')
export class GamesController {

  constructor(private service: GamesService) {
  }

  @Get()
  public async getAll(): Promise<GameDto[]> {
    return await this.service.getAll();
  }

  @Post()
  public async save(@Body() dto: GameDto): Promise<GameDto> {
    return await this.service.save(dto);
  }

  @Delete()
  public async delete(@Query() params): Promise<void> {
    await this.service.delete(params.name);
  }

  @Get('search')
  public async searchByTag(@Query() params): Promise<GameDto[]> {
    return await this.service.searchByTag(params.name)
      .then(games => games.map(game => GameConverter.toDto(game)));
  }
}
