import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(type => Tag, { cascade: ['insert', 'update', 'recover'], eager: true, onDelete: 'CASCADE' })
  @JoinTable({
    name: 'games_tags',
    joinColumn: { name: 'game_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
