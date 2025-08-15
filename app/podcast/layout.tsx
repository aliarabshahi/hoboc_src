import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Metadata } from 'next'

import { AboutSection } from './components/AboutSection'
import { AudioProvider } from './components/AudioProvider'
import { AudioPlayer } from './components/player/AudioPlayer'
import { TinyWaveFormIcon } from './components/TinyWaveFormIcon'
import { Waveform } from './components/Waveform'
import posterImage from './images/poster.png'

export const metadata: Metadata = {
  title: {
    template: '%s - Their Side',
    default:
      'Their Side - Conversations with the most tragically misunderstood people of our time',
  },
  description:
    'Conversations with the most tragically misunderstood people of our time.',
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

// keep your SpotifyIcon, ApplePodcastIcon, OvercastIcon, RSSIcon functions here if needed
// I’ve omitted them for brevity, but copy them from your original MainLayout

export default function PodcastLayout({ children }: { children: React.ReactNode }) {
  const hosts = ['Eric Gordon', 'Wes Mantooth']

  return (
    <AudioProvider>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        {/* Left sidebar */}
        <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:px-12 lg:text-sm/7 lg:whitespace-nowrap lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, i) => (
              <Fragment key={host}>
                {i !== 0 && <span aria-hidden="true" className="text-slate-400">/</span>}
                {host}
              </Fragment>
            ))}
          </span>
        </div>

        {/* Poster / About panel */}
        <div className="relative z-10 mx-auto px-4 pt-10 pb-4 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:px-8 lg:py-12 xl:px-12">
          <Link href="/" className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl">
            <Image className="w-full" src={posterImage} alt="" sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem" priority />
            <div className="absolute inset-0 rounded-lg ring-1 ring-black/10 ring-inset sm:rounded-xl lg:rounded-2xl" />
          </Link>

          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-900">
              <Link href="/">Their Side</Link>
            </p>
            <p className="mt-3 text-lg/8 font-medium text-slate-700">
              Conversations with the most tragically misunderstood people of our time.
            </p>
          </div>

          <AboutSection className="mt-12 hidden lg:block" />

          {/* subscription links */}
          {/* add your Listen section here with SpotifyIcon etc */}
        </div>
      </header>

      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <Waveform className="absolute top-0 left-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm/7 font-medium text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Hosted by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm/7 font-bold text-slate-900">
            {hosts.map((host, i) => (
              <Fragment key={host}>
                {i !== 0 && <span aria-hidden="true" className="text-slate-400">/</span>}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-10 lg:left-112 xl:left-120">
        <AudioPlayer />
      </div>
    </AudioProvider>
  )
}
