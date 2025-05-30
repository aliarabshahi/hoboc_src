# 🧭 Navbar Component

A responsive, RTL-friendly navigation bar built with **React**, **Next.js**, and **Tailwind CSS**. Includes support for mobile/desktop views, dynamic menu toggling, and login actions.

## 🌐 Features

- Mobile-first responsive design using Tailwind's utility classes.
- RTL support (`dir="rtl"`).
- Hamburger menu for mobile view.
- Separate components for logo, menu, and login actions.
- Conditionally rendered mobile and desktop UI using Tailwind breakpoints.

## 🏗️ Structure
```
components/
└── navbar/
    ├── Navbar.tsx
    ├── NavbarLogo.tsx
    ├── NavbarMenu.tsx
    ├── NavbarLogin.tsx
    └── README.md

```


## 🧩 Components

### `<Navbar />`

Main navigation container, includes:

- Mobile hamburger menu (toggles menu on small screens).
- Logo section.
- Desktop menu (`md:block`).
- Login buttons (responsive with `shrink` prop).

Responsive layout:
- `md:` shows desktop menu.
- `lg:` shows full login buttons.

### `<NavbarLogo />`

Renders either:
- A simple text logo (`HOBOC`), or
- An image logo (commented out for now, supports Next.js `Image` component).

### `<NavbarMenu />`

A placeholder for your navigation links. (You should define it separately.)

### `<NavbarLogin shrink={true | false} />`

Displays login buttons with different behavior:

- `shrink: true`: minimal button with icon (used in mobile view).
- `shrink: false`: full login/signup buttons (used in desktop view).

## 🧪 Props

| Component      | Prop   | Type      | Description                            |
|----------------|--------|-----------|----------------------------------------|
| NavbarLogin    | shrink | `boolean` | Controls whether to show full or compact version |

## 🎯 Tailwind Responsive Logic

| Class        | Behavior                     |
|--------------|------------------------------|
| `hidden`     | `display: none;`             |
| `md:block`   | Show on screens ≥ 768px      |
| `lg:flex`    | Show on screens ≥ 1024px     |
| `block`      | Always show (default)        |


## 🛠️ To Do

- [ ] change logo from text to png `NavvarLogo`.
- [ ] only login when display shrink change the location
- [ ] `Navbar Menu` must recive the data from the backend
