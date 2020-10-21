import { GameDto } from '../dto/game.dto';
import { Game } from '../models/game.entity';

export class GameConverter {

  public static toEntity(dto: GameDto): Game {
    const game: Game = new Game();
    game.id = dto.id;
    game.name = dto.name;
    return game;
  }

  public static toDto(game: Game): GameDto {
    const dto: GameDto = new GameDto();
    dto.name = game.name;
    dto.id = game.id;
    dto.tags = game.tags?.map(tag => tag.name);
    return dto;
  }

}
