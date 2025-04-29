# My Blog

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![next-intl](https://img.shields.io/badge/next--intl-3.5.4-orange?style=flat-square)](https://next-intl-docs.vercel.app/)
[![MDX](https://img.shields.io/badge/MDX-3.0.0-yellow?style=flat-square)](https://mdxjs.com/)
[![Vitest](https://img.shields.io/badge/Vitest-1.2.2-green?style=flat-square)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

A modern, multilingual blog built with Next.js, featuring a beautiful dark mode, MDX support, and internationalization.

## Features

- 🌐 **Internationalization (i18n)**

  - Support for multiple languages (currently English and Portuguese)
  - Easy language switching with URL-based routing
  - Seamless content translation management

- 🌙 **Dark Mode**

  - Beautiful dark/light theme switching
  - System preference detection
  - Persistent theme selection

- 📝 **MDX Support**

  - Write posts in MDX format
  - Code syntax highlighting
  - Support for React components in markdown
  - Automatic slug generation

- 🎨 **Modern Design**

  - Clean and responsive layout
  - Tailwind CSS for styling
  - Custom components for consistent UI
  - Smooth animations and transitions

- 🧪 **Testing**
  - Comprehensive test suite with Vitest
  - Component testing with React Testing Library
  - High test coverage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dennercodes/blog.git
cd blog
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The blog will be available at `http://localhost:3000`.

### Project Structure

```
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── content/
│   │   └── blog/           # MDX blog posts by language
│   ├── i18n/               # Internationalization setup
│   ├── messages/           # Translation messages
│   ├── providers/          # React context providers
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── messages/              # Translation files
└── tests/                 # Test files
```

### Writing Posts

1. Create a new MDX file in `src/content/blog/[language]/` directory
2. Add frontmatter with required fields:

```mdx
---
title: Your Post Title
description: A brief description
date: '2024-03-23'
tags: ['tag1', 'tag2']
locale: 'en'
originalTitle: 'Original Title' # For translations
---
```

3. Write your content in MDX format
4. The post will automatically appear in the blog list

### Translation

1. Create corresponding MDX files in each language directory
2. Use the same `originalTitle` to link translations
3. Update translation messages in `messages/[lang].json`

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript type checking

## Technologies

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [next-intl](https://next-intl-docs.vercel.app/) - Internationalization
- [MDX](https://mdxjs.com/) - Markdown with JSX
- [Vitest](https://vitest.dev/) - Testing framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Component testing
- [Radix UI](https://www.radix-ui.com/) - Accessible components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Denner Rondinely - [GitHub](https://github.com/dennercodes)

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/docs/)
