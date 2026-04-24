import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/artists', label: 'Artists' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/donate', label: 'Donate' },
];

interface Props {
  registerUrl: string;
}

export default function MobileMenu({ registerUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex flex-col gap-1.5 p-2 lg:hidden"
      >
        <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-[#1a1a1a] transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <nav
          className="absolute left-0 top-full w-full bg-[#faf7f2] border-t border-[#f0ebe5] px-6 py-8 flex flex-col gap-6 lg:hidden shadow-lg"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-['Cormorant_Garamond',Georgia,serif] text-2xl text-[#1a1a1a] hover:text-[#ff8c3a] transition-colors no-underline"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={registerUrl}
            className="btn btn--primary w-fit mt-2"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Register as Artist
          </a>
        </nav>
      )}
    </>
  );
}