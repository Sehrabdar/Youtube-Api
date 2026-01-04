import { Expose } from 'class-transformer';

export class SearchVideoDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  fullName: string;

  @Expose()
  description: string;
  
  @Expose()
  thumbnail: string;

  constructor(partial: Partial<SearchVideoDto>) {
    Object.assign(this, partial);
  }
}
