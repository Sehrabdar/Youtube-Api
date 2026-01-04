import { Link } from "react-router-dom";
import type { VideoSearchResult } from "../api/youtube.api";

interface Props {
    videos: VideoSearchResult[];
}

export default function VideoList({ videos }: Props) {
    if (!videos.length) return null;

    return (
        <div>
            {videos.map((video) => (
                <div key={video.id}>
                    <div>{video.fullName}</div>
                    <div>
                        <Link to={`/video/${video.id}`}>
                            <img src={video.thumbnail} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}