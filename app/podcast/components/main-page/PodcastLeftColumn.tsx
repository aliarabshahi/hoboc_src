// app/podcast/components/main-page/PodcastLeftColumn.tsx
import { PodcastEpisode } from '../../lib/episodes';
import { AudioPlayer } from '../player/AudioPlayer';
import EpisodeList from './EpisodeList';

interface PodcastLeftColumnProps {
  episodes: PodcastEpisode[];
}

export default function PodcastLeftColumn({ episodes }: PodcastLeftColumnProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {/* Removed the waveform from here since it's now in the layout */}
        <EpisodeList episodes={episodes} />
      </div>

      <div
        className="sticky bottom-0 bg-white border-t border-slate-200 z-10"
        dir="ltr"
      >
        <AudioPlayer />
      </div>
    </>
  );
}