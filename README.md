# My Blog

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.1-green?style=flat-square&logo=vitest)](https://vitest.dev/)
[![next-intl](https://img.shields.io/badge/next--intl-4.1-orange?style=flat-square)](https://next-intl-docs.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A personal blog built with Next.js and next-intl, featuring internationalization (i18n), dark mode support, and MDX content.

## Features

- 🌐 Internationalization (i18n) with next-intl
- 🌓 Dark mode support with next-themes
- 📝 MDX blog posts with syntax highlighting
- 🎨 Tailwind CSS for styling
- 🧪 Testing with Vitest and Testing Library
- 📱 Responsive design
- ⚡ Fast page loads with Next.js App Router
- 🔍 SEO optimized

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX support
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Vitest](https://vitest.dev/) - Testing
- [Testing Library](https://testing-library.com/) - Testing utilities

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/dennercodes/blog.git
cd blog
```

### Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Testing

The project uses Vitest and Testing Library for testing. Run tests with:

```bash
npm run test
```

For test coverage:

```bash
npm run test:coverage
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). The deployment process is automatically triggered when changes are pushed to the main branch.

### Build Process

Vercel automatically:

1. Installs dependencies
2. Runs the build command
3. Runs tests
4. Deploys if all checks pass

### Environment Variables on Vercel

Required environment variables for production:

- `NEXT_PUBLIC_BASE_URL`: Your production URL

## Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── content/
│   │   └── blog/           # MDX blog posts
│   ├── i18n/               # Internationalization setup
│   ├── messages/           # Translation files
│   ├── providers/          # React context providers
│   └── utils/              # Utility functions
├── public/                 # Static files
├── tests/                  # Test setup and utilities
└── package.json           # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Denner Rondinely - [@dennercodes](https://github.com/dennercodes)

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
