# Food-site

A web application for food delivery and restaurant browsing.

## Features
- Browse restaurants
- Order food
- Track deliveries

## Technologies
- React.js
- Node.js
- Express

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/food-ordering-website.git
   cd food-ordering-website/vite-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured for automatic deployment to GitHub Pages:

1. Push your code to the main branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at: `https://YOUR_USERNAME.github.io/food-ordering-website`

### Manual Deployment

To manually deploy:

```bash
npm run build
```

The built files will be in the `dist` folder, which you can deploy to any static hosting service.

## Technology Stack

- React 19
- Vite 6
- Tailwind CSS
- React Toastify for notifications

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
