# Analytics Dashboard

A modern analytics dashboard built with React, TypeScript, and shadcn/ui. This project provides a beautiful and interactive interface for visualizing analytics data with real-time updates, theme switching, and drag-and-drop customization.

## Features

- 🎨 Modern UI with shadcn/ui components
- 📊 Interactive charts using Recharts
- 🌓 Light, dark, and blue theme support
- 🔄 Real-time data updates
- 📱 Fully responsive design
- 🎯 KPI cards with animated counters
- 🔍 Regional data filtering
- 📅 Date range selection
- 📋 CSV data export
- 🎭 Drag-and-drop layout customization

## Tech Stack

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for UI components
- Recharts for data visualization
- React Query for data fetching
- @dnd-kit for drag-and-drop
- date-fns for date handling
- IBM Plex fonts for typography

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `/src/components` - React components
  - `/ui` - shadcn/ui components
  - `/layout` - Layout components
  - `/dashboard` - Dashboard-specific components
  - `/charts` - Chart components
- `/src/contexts` - React context providers
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and API client
- `/src/types` - TypeScript type definitions

## Backend Integration

The dashboard connects to an Express.js backend running on port 5000. The backend provides analytics data through the `/api/data` endpoint. The data is automatically refreshed every 5 seconds to ensure real-time updates.

## Customization

### Themes

The dashboard supports three themes:
- Light - Clean, professional look
- Dark - Reduced eye strain
- Blue - Brand-focused alternative

Themes can be switched using the theme toggle in the top bar. The selected theme is persisted in localStorage.

### Layout

The dashboard layout is customizable through drag-and-drop:
1. Hover over any card to reveal the drag handle
2. Click and drag to reposition
3. Layout changes are automatically saved to localStorage

### Charts

All charts are responsive and theme-aware:
- Sales Trend - Area chart with gradient
- Regional Performance - Bar chart with filtering
- Device Usage - Doughnut chart
- Traffic Sources - Pie chart

## Development

### Adding New Components

1. Install shadcn/ui components:
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. Components are added to `/src/components/ui`

### Styling

- Use Tailwind CSS utility classes
- Follow shadcn/ui design patterns
- Custom styles in `/src/index.css`

### Type Safety

- TypeScript is configured for strict type checking
- Type definitions in `/src/types`
- Component props are fully typed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
