
import { Controller, Get, Param, Query } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { SearchQueryDto } from 'src/dto/search-query.dto';
import { SearchVideoDto } from 'src/dto/search-video.dto';
import { VideoSummaryDto } from 'src/dto/video-summary.dto';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('search-videos')
  async searchVideos(@Query() query: SearchQueryDto): Promise<SearchVideoDto[]>{
    return this.youtubeService.searchVideos(query.term);
  }
  @Get(':id/summary')
  async getRepoSummary(@Param('id') id: string):Promise<VideoSummaryDto> {
    return this.youtubeService.getVideoSummary(id);
  }
}
