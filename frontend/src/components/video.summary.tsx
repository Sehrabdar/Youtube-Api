import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { youtubeApi, type VideoSummary } from "../api/youtube.api";
import styles from '../styles/video-summary.module.css';

export default function VideoSummaryPage() {
    const { id } = useParams<{ id: string }>();
    const [summary, setSummary] = useState<VideoSummary | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await youtubeApi.videoSummary(id);
                setSummary(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load video summary');
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return (
        <>
            <Link to="/">{'< Back to search'}</Link>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {summary && (
                <div className={styles.wrapper}>
                    <h2 className={styles.h2}> {summary?.title}</h2>
                    <div className={styles.meta}>
                        <h3 className={styles.description}>Description: {summary?.description}</h3>
                        <span className={styles.badge}>👁️Views: {summary?.viewCount} </span>
                        <span className={styles.badge}>👍Likes: {summary?.likeCount} </span>
                        <span className={styles.badge}>🕐Duration: {summary?.duration} </span>
                    </div>
                </div>
            )}
        </>

    );

}