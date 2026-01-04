import { registerAs } from "@nestjs/config";

export default registerAs('youtube', () => ({
  baseUrl: process.env.YOUTUBE_BASE_URL,
  videoUrl: process.env.YOUTUBE_VIDEO_URL,
  key: process.env.YOUTUBE_KEY,
}));