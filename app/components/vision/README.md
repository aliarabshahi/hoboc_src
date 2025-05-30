# 👁️ Vision Component

A responsive, RTL-friendly **Vision section** for your website, built with **React**, **Next.js**, and **Tailwind CSS**. It includes an image and a list of vision items that describe your platform’s mission, services, and calls to action.

## 🌐 Features

- Responsive layout with Tailwind utility classes.
- Right-to-left support (`dir="rtl"`).
- Adaptive layout: image and text switch alignment based on screen size.
- Interactive hover effects for links.
- Modular structure with separate components for image and content.

## 🧩 Components

### `<Vision />`

Main container that combines the layout:

- Flex layout switches from column (mobile) to reversed row (desktop).
- Uses Tailwind classes to manage padding, gap, and alignment.
- Wraps `<VisionImage />` and `<VisionTexts />`.

### `<VisionImage />`

Displays an SVG illustration (`/vision.svg`) using Next.js `<Image />`.

Props:

| Prop      | Type     | Description                 |
|-----------|----------|-----------------------------|
| className | `string` | Optional Tailwind classes   |

### `<VisionTexts />`

Renders a list of "vision items", including:

- Title
- Description
- Call-to-action link with icon

Each item is clickable and wrapped in a styled `<Link />`.

Props:

| Prop      | Type     | Description                 |
|-----------|----------|-----------------------------|
| className | `string` | Optional Tailwind classes   |



## 📁 Folder Structure
```
components/
└── vision/
    ├── Vision.tsx
    ├── VisionTexts.tsx
    ├── VisionImage.tsx
    └── README.md

```

## 🎯 Tailwind Responsive Logic

| Class               | Behavior                                         |
|---------------------|--------------------------------------------------|
| `flex-col`          | Vertical layout on small screens                 |
| `lg:flex-row-reverse` | Horizontal reversed layout on large screens   |
| `group-hover`       | Smooth color transitions on hover                |
| `lg:flex-[x]`       | Controls relative sizing on large screens        |

---


## 🛠️ To Do

- [ ] Choose a meaningful and high-quality `illustration` image.
