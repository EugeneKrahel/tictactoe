import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../models/game.entity';
import { Repository } from 'typeorm';
import { GameConverter } from '../converters/game.converter';
import { GameDto } from '../dto/game.dto';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../models/tag.entity';

@Injectable()
export class GamesService {

  constructor(@InjectRepository(Game) private readonly repo: Repository<Game>,
              private tagsService: TagsService) {
  }

  public async getAll(): Promise<GameDto[]> {
    return await this.repo.find()
      .then(games => games.map(game => GameConverter.toDto(game)));
  }

  public async delete(name: string): Promise<void> {
    const game = await this.repo.findOne({name: name});
    await this.repo.remove(game);
  }

  public async save(dto: GameDto): Promise<GameDto> {
    const entity: Game = GameConverter.toEntity(dto);
    entity.tags = await this.getTags(dto.tags);
    console.log(entity);
    return await this.repo.save(entity)
      .then(game => GameConverter.toDto(game));
  }

  public async searchByTag(tagName: string): Promise<Game[]> {
    const ids = await this.repo.createQueryBuilder('game')
      .leftJoin('game.tags', 'tag')
      .where('tag.name = :name', { name: tagName })
      .select('game.id')
      .getMany();
    return await this.repo.findByIds(ids);
  }

  private async getTags(names: string[]) {
    if (!names) {
      return [];
    }
    const dbTags: Tag[] = await this.tagsService.findByNames(names);
    const dbTagsNames = dbTags.map(tag => tag.name);
    const newTags: string[] = names.filter(i => !dbTagsNames.includes(i));
    return dbTags.concat(newTags.map(name => ({ name } as Tag)));
  }
}
