# 🦶 Footer Component

A responsive, RTL-friendly footer built with **React**, **Next.js**, and **Tailwind CSS**.  
Includes social media links with icons and a footer navigation menu.

---

## 🌐 Features

- Responsive layout with flexbox for desktop and mobile views.
- Right-to-left (`dir="rtl"`) support.
- Social media section with colored SVG icons (LinkedIn, YouTube, Instagram, Telegram).
- Footer navigation menu with categorized links.
- Uses Next.js `Link` and `Image` components for optimized routing and images.
- Clean separation into three components:
  - `<Footer />` (main container)
  - `<FooterSocial />` (social media links with icons)
  - `<FooterNavbar />` (categorized navigation links)

---

## 🏗️ Structure

---

## 🧩 Components

```
components/
└── footer/
    ├── Footer.tsx
    ├── FooterNavbar.tsx
    ├── FooterSocial.tsx
    └── README.md

```

### `<Footer />`

Main footer wrapper. Sets the layout (flex row on medium+ screens, column on small screens), applies padding and RTL direction, and renders `<FooterSocial />` and `<FooterNavbar />`.

### `<FooterSocial />`

Renders the social media section with:

- Company logo (Next.js `Image` optimized).
- Social media icons (LinkedIn, YouTube, Instagram, Telegram) with official brand colors.
- Each icon links to the corresponding social page (opens in a new tab).
- Uses React Icons library.

### `<FooterNavbar />`

Renders footer navigation links divided into categories such as "Company" and "Services".  
Each category has a title and a list of links.

---

## 🛠️ Props

Currently, no props are required. All data (links, icons) are defined internally but can be easily extended.

---

## 🎨 Styling and Responsiveness

- Tailwind CSS utility classes handle layout and spacing.
- `dir="rtl"` ensures right-to-left layout.
- Responsive flexbox:
  - Column layout on small screens.
  - Row layout (`md:flex-row`) on medium screens and above.
- Social icons have hover opacity effect for better UX.

---

## 🛠️ To Do

- [ ] Choose a meaningful and logo transparent  for `hoboc`.
- [ ] modify the navbar title or link  .
- [ ] change `شبکه های اجتماعی` to the hoboc or something about the website
