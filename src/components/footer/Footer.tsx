'use client';

import Link from 'next/link';
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { SocialLink } from './types';

const socialLinks: SocialLink[] = [
  {
    icon: LinkedInLogoIcon,
    href: 'https://www.linkedin.com/in/denner-rondinely-da-silva',
    label: 'LinkedIn',
  },
  {
    icon: InstagramLogoIcon,
    href: 'https://instagram.com/denner.land',
    label: 'Instagram',
  },
  {
    icon: GitHubLogoIcon,
    href: 'https://github.com/dennercodes',
    label: 'GitHub',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-header/80 backdrop-blur supports-[backdrop-filter]:bg-header/60">
      <div className="container flex flex-col items-center justify-center max-w-[670px] mx-auto px-5 py-4">
        <div className="flex items-center space-x-4 mb-4">
          {socialLinks.map(social => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text transition-colors hover:bg-button-hover"
              aria-label={social.label}
            >
              <social.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
        <p className="text-sm text-text-secondary">
          © {currentYear} Denner Rondinely. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
