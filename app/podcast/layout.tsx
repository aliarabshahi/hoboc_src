// app/podcast/layout.tsx
import { AudioProvider } from "./components/AudioProvider";
import SharedRightColumn from "./components/SharedRightColumn";

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hosts = ["مهندس داده حمید", "تحلیلگر داده رضا"];

  return (
    <AudioProvider>
      <div className="flex flex-col lg:flex-row h-auto">
        <SharedRightColumn hosts={hosts} showWaveformOnMobile={true} />
        <main className="w-full lg:w-3/5 flex flex-col">
          {children}
        </main>
      </div>
    </AudioProvider>
  );
}