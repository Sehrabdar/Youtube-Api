import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './components/search.bar';
import VideoList from './components/video.list';
import VideoSummaryPage from './components/video.summary';
import { youtubeApi } from './api/youtube.api';
import type { VideoSearchResult } from './api/youtube.api';

export default function App() {
  const [videos, setVideos] = useState<VideoSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await youtubeApi.search(term);
      setVideos(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to search videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              Youtube Video Search
            </h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Hold on...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <VideoList videos={videos} />
          </>
        }
      />
      <Route path="/video/:id" element={<VideoSummaryPage />} />
    </Routes>
  );
}
