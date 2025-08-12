'use client'

import { useState, SVGProps } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// ----- Types -----
type NavItem = { name: string; href: string }
type Stat = { label: string; value: string }
type Value = { name: string; description: string }
type TeamMember = { name: string; role: string; imageUrl: string }
type BlogPost = {
  id: number
  title: string
  href: string
  description: string
  imageUrl: string
  date: string
  datetime: string
  author: { name: string; imageUrl: string }
}
type FooterLink = { name: string; href: string }
type SocialLink = { name: string; href: string; icon: (props: SVGProps<SVGSVGElement>) => JSX.Element }

// ----- Data -----
const navigation: NavItem[] = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Resources', href: '#' },
  { name: 'Company', href: '#' },
]

const stats: Stat[] = [
  { label: 'Transactions every 24 hours', value: '44 million' },
  { label: 'Assets under holding', value: '$119 trillion' },
  { label: 'New users annually', value: '46,000' },
]

const values: Value[] = [
  { name: 'Be world-class', description: '...' },
  { name: 'Share everything you know', description: '...' },
  { name: 'Always learning', description: '...' },
  { name: 'Be supportive', description: '...' },
  { name: 'Take responsibility', description: '...' },
  { name: 'Enjoy downtime', description: '...' },
]

const team: TeamMember[] = [
  { name: 'Michael Foster', role: 'Co-Founder / CTO', imageUrl: '/hero.png' },
]

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Vel expedita assumenda placeat aut nisi optio voluptates quas',
    href: '#',
    description: 'Illo sint voluptas...',
    imageUrl: '/hero.png',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    author: { name: 'Michael Foster', imageUrl: '/hero.png' },
  },
]

const footerNavigation: { main: FooterLink[]; social: SocialLink[] } = {
  main: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  social: [
    {
      name: 'GitHub',
      href: '#',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484..."
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

// ----- Component -----
export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src="/hero.png" className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <DialogPanel className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-white px-6 py-6 z-50">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img alt="" src="/hero.png" className="h-8 w-auto" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 p-2.5 text-gray-700 rounded-md"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a href="#" className="block px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                Log in
              </a>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero */}
      <main className="isolate">
        <section className="mx-auto max-w-7xl px-6 pt-36">
          <div className="relative w-full lg:max-w-xl">
            <h1 className="text-5xl font-semibold text-gray-900 sm:text-7xl">
              We’re changing the way people connect
            </h1>
            <p className="mt-8 text-lg text-gray-500">
              Cupidatat minim id magna ipsum sint dolor qui...
            </p>
          </div>
          <div className="mt-14 flex gap-8">
            <img src="/hero.png" alt="" className="w-44 rounded-xl" />
            <img src="/hero.png" alt="" className="w-44 rounded-xl" />
            <img src="/hero.png" alt="" className="w-44 rounded-xl" />
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto mt-12 max-w-7xl px-6">
          <dl className="space-y-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-base text-gray-600">{stat.label}</dt>
                <dd className="text-5xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Values */}
        <section className="mx-auto mt-12 max-w-7xl px-6">
          {values.map((value) => (
            <div key={value.name} className="mb-4">
              <dt className="font-semibold">{value.name}</dt>
              <dd className="text-gray-600">{value.description}</dd>
            </div>
          ))}
        </section>

        {/* Team */}
        <section className="mx-auto mt-12 max-w-7xl px-6">
          <h2 className="text-4xl font-semibold text-gray-900">Our team</h2>
          <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {team.map((person) => (
              <li key={person.name} className="text-center">
                <img src={person.imageUrl} alt="" className="mx-auto h-24 w-24 rounded-full" />
                <h3 className="mt-4 font-semibold">{person.name}</h3>
                <p className="text-gray-600">{person.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog */}
        <section className="mx-auto mt-12 max-w-7xl px-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="rounded-lg bg-gray-900 p-6 text-white">
              <img src={post.imageUrl} alt="" className="mb-4 w-full rounded-lg" />
              <time dateTime={post.datetime}>{post.date}</time>
              <h3 className="text-lg font-semibold mt-2">
                <a href={post.href}>{post.title}</a>
              </h3>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <nav className="flex justify-center gap-x-6">
            {footerNavigation.main.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex justify-center gap-x-6">
            {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
                <item.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
