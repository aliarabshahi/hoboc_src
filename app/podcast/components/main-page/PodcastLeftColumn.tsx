// app/podcast/components/main-page/PodcastLeftColumn.tsx
import { PodcastEpisode } from '../../lib/episodes';
import { Waveform } from '../Waveform';
import { AudioPlayer } from '../player/AudioPlayer';
import EpisodeList from './EpisodeList';

interface PodcastLeftColumnProps {
  episodes: PodcastEpisode[];
}

export default function PodcastLeftColumn({ episodes }: PodcastLeftColumnProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="hidden lg:block sticky top-0 z-20 bg-white">
          <Waveform className="h-20 w-full" />
        </div>

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