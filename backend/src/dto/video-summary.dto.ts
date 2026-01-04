import { Expose } from 'class-transformer';

export class VideoSummaryDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  channelTitle: string;

  @Expose()
  description: string;

  @Expose()
  viewCount: number;

  @Expose()
  likeCount: number;

  @Expose()
  duration: string;

  constructor(partial: Partial<VideoSummaryDto>) {
    Object.assign(this, partial);
  }
}
