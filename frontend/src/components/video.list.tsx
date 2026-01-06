import { Link } from "react-router-dom";
import type { VideoSearchResult } from "../api/youtube.api";
import styles from '../styles/videos-list.module.css';

interface Props {
    videos: VideoSearchResult[];
}

export default function VideoList({ videos }: Props) {
    if (!videos.length) return null;

    return (
        <div className={styles.grid}>
            {videos.map((video) => (
                <div key={video.id} className={styles.card}>
                    <div className={styles.fullName}>{video.fullName}</div>
                    <div>
                        <Link to={`/video/${video.id}`} className={styles.link}>
                            <img src={video.thumbnail} className={styles.img} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}