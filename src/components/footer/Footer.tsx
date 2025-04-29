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
  return (
    <footer className="w-full border-t border-border bg-header py-6">
      <div className="container flex max-w-[670px] items-center justify-center space-x-4 px-5 mx-auto">
        {socialLinks.map((social) => (
          <Link
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-button-secondary-bg text-button-secondary-text transition-colors hover:bg-button-hover"
            aria-label={social.label}
          >
            <social.icon className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </footer>
  );
} 