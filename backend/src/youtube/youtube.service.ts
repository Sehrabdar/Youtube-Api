import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { SearchVideoDto } from 'src/dto/search-video.dto';
import { firstValueFrom } from 'rxjs';
import { VideoSummaryDto } from 'src/dto/video-summary.dto';

@Injectable()
export class YoutubeService {
  private readonly baseUrl: string;
  private readonly key: string;
  private readonly videoUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.baseUrl = this.configService.get<string>('youtube.baseUrl')!;
    this.key = this.configService.get<string>('youtube.key') ?? "";
    this.videoUrl = this.configService.get<string>('youtube.videoUrl')!;
  }
  private getAuthHeaders() {
    return {
      Accept: 'application/json',
    };
  }

  async searchVideos(term: string): Promise<SearchVideoDto[]> {
    if (!this.baseUrl || !this.key) {
      throw new Error(`Missing config: baseUrl=${!!this.baseUrl}, key=${!!this.key}`);
    }
    const url = `${this.baseUrl}${encodeURIComponent(term)}&key=${this.key}`;

    const res = await fetch(url, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Youtube API error: ${res.status}`);
    }

    const data: any = await res.json();
    return (data.items ?? []).map((item: any) => new SearchVideoDto({
      id: item.id.videoId,
      name: item.snippet.title,
      fullName: item.snippet.channelTitle,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
    }),
    );
  }

  async getVideoSummary(id: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${this.videoUrl}${encodeURIComponent(id)}&key=${this.key}`, {
        headers: this.getAuthHeaders(),
      }),
    );
    const item = response.data.items?.[0];
  
  if (!item) {
    throw new Error(`Video not found: ${id}`);
  }
    return new VideoSummaryDto({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      viewCount: parseInt(item.statistics?.viewCount ?? '0'),
      likeCount: parseInt(item.statistics?.likeCount ?? '0'),
      duration: item.contentDetails?.duration ?? 'Unknown'
    });
  }
}


