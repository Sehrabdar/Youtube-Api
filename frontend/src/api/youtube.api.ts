import axios from "axios";

const baseApi = 'http://localhost:3000';

export const youtubeApi = {
    search: (term: string) => axios.get(`${baseApi}/youtube/search-videos?term=${term}`),
    videoSummary: (id: string) => axios.get(`${baseApi}/youtube/${id}/summary`)
}

export interface VideoSearchResult {
    id: number;
    name: string;
    fullName: string;
    description: string;
    thumbnail: string;
}

export interface VideoSummary {
    title: string;
    channelTitle: string;
    description: string;
    viewCount: number;
    likeCount: number;
    duration: string;
}