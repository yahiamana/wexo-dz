# WEXO DZ Portfolio

A professional, multilingual portfolio website for WEXO DZ with a full admin panel.

## Features

- 🌍 **Multilingual** - English, French, and Arabic with RTL support
- 🎨 **Modern Design** - Clean, professional, and responsive
- 🔐 **Admin Panel** - Full CRUD for all content
- 📱 **Mobile First** - Perfect experience on all devices
- 🚀 **Fast** - Optimized for performance
- 🔍 **SEO Ready** - Meta tags and structured data

## Tech Stack

- **Framework**: Next.js 16.1.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: JWT with jose
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-secret-key"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database:
   ```bash
   npm run db:seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Admin Access

After seeding, you can access the admin panel at `/admin/login`:

- **Email**: admin@wexodz.com
- **Password**: Admin@123!

**⚠️ Change these credentials in production!**

## Project Structure

```
├── app/
│   ├── [locale]/          # Public pages (en, fr, ar)
│   ├── admin/             # Admin panel
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── home/              # Home page sections
├── lib/                   # Utilities
├── prisma/                # Database schema
└── translations/          # i18n JSON files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Prisma Studio

## License

Private project.
