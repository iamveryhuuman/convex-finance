# Convex Finance

A modern financial analytics and trading platform built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- 📊 Dashboard with market overview
- 👀 Watchlist management
- 📈 Technical analysis tools
- 📋 Strategy builder and management
- 🤖 AI-powered trading assistant
- 📰 News & Research integration
- 👥 Community features
- 📚 Learning center
- 🔐 Secure authentication with Supabase

## Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/)
- **Authentication**: [Supabase Auth](https://supabase.com/auth)
- **Database**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: React Context
- **Package Manager**: [pnpm](https://pnpm.io/)

## Prerequisites

- Node.js 18+ 
- pnpm
- Supabase account and project

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/iamveryhuuman/convex-finance.git
   cd convex-finance
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
convex-finance/
├── app/                    # Next.js app directory
│   ├── ai-assistant/      # AI trading assistant
│   ├── auth/             # Authentication pages
│   ├── profile/          # User profile
│   ├── strategies/       # Trading strategies
│   ├── technical/        # Technical analysis
│   └── watchlist/        # Watchlist management
├── components/           # Reusable components
│   ├── ui/              # UI components
│   └── ...              # Feature-specific components
├── contexts/            # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── public/             # Static assets
```

## Authentication Flow

1. Users can register with email/password
2. Email verification is required
3. Login redirects to dashboard
4. Protected routes require authentication
5. Session management via Supabase

## Development Guidelines

- Use TypeScript for type safety
- Follow [Next.js best practices](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- Implement responsive design
- Write clean, modular code
- Use Tailwind CSS for styling
- Follow component-driven development

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email [your-email@example.com](mailto:your-email@example.com) or open an issue on GitHub. 