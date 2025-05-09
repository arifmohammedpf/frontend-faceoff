# 42 Event Management App

A polished, responsive web application for managing and exploring events from the 42 network. This application allows users to browse upcoming and past events, view detailed event information, and provides an admin panel for managing events.

![42 Events App Screenshot](public/app-screenshot.png)

## Features

- **Event Browsing**: View all events with upcoming events prioritized
- **Event Details**: See comprehensive information about each event including description, date/time, location, and more
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Dark Theme**: Elegant dark bluish UI theme for a modern look and feel
- **Admin Panel**: Protected section for administrators to manage events
- **API Integration**: Connects to the 42 API for real-time event data

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router and React Server Components
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) for elegant, accessible components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- **Authentication**: OAuth 2.0 using the 42 API
- **Date Formatting**: [date-fns](https://date-fns.org/) for date manipulation
- **Icons**: [Lucide React](https://lucide.dev/icons/) for beautiful, consistent iconography
- **TypeScript**: For type safety and improved developer experience

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Environment Setup

1. Clone this repository
2. Copy the example environment file:
   ```bash
   cp example.env .env.local
   ```
3. Fill in the required environment variables:
   ```
   API_BASE_URL=https://api.intra.42.fr   # Base URL for the 42 API
   CLIENT_ID=your_42_client_id            # Your 42 API client ID
   CLIENT_SECRET=your_42_client_secret    # Your 42 API client secret
   ```

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Run the development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm run start
# or
yarn start
```

## Project Structure

```
src/
  ├── app/                 # Next.js app router pages
  │   ├── admin/           # Admin panel
  │   ├── events/          # Event pages
  │   │   └── [id]/        # Dynamic event details page
  │   ├── error.tsx        # Error handling
  │   ├── loading.tsx      # Loading state
  │   └── not-found.tsx    # 404 page
  ├── components/          # Reusable components
  │   ├── ui/              # UI components from ShadCN
  │   └── Navbar.tsx       # Navigation component
  └── lib/                 # Utility functions
      ├── getAccessToken.ts # OAuth token fetching
      └── getUser.ts       # User data fetching
```

## API Integration

This application integrates with the 42 Intra API using OAuth 2.0 for authentication. The app fetches event data and user information to provide a seamless experience.

## Deployment

This application can be deployed to Vercel or any other Next.js-compatible hosting platform. Make sure to set up the required environment variables in your deployment environment.

## License

[MIT](LICENSE)

## Acknowledgements

- [42 Network](https://www.42.fr/) for providing the API
- [ShadCN UI](https://ui.shadcn.com/) for the beautiful component library
- [Next.js](https://nextjs.org/) for the amazing framework
