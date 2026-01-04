import { useState, useCallback } from "react";
import { youtubeApi } from "../api/youtube.api";

export const useYoutube = () => {
    const [loading, setLoading] = useState(false);

    const searchVideos = useCallback(async (term: string) => {
        setLoading(true);
        try{
            const {data} = await youtubeApi.search(term);
            return data.videos;
        }
        finally{
            setLoading(false);
        }
    }, []);

    const getVideoSummary = useCallback(async (id:string) => {
        setLoading(true);
        try{
            const { data } = await youtubeApi.videoSummary(id);
            return data;
        }
        finally{
            setLoading(false);
        }
    }, []);

    return{ searchVideos, getVideoSummary, loading};
};