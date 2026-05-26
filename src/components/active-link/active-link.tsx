'use client';
import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type ActiveLinkProps = {
  children: React.ReactNode;
} & LinkProps;

export const ActiveLink = ({ children, href, ...rest }: ActiveLinkProps) => {
  const linkPath = typeof href === 'string' ? href : href.pathname;
  const pathname = usePathname();
  const isActive = pathname === linkPath || pathname?.startsWith(`${linkPath}/`);

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        'text-action-sm transition-colors hover:text-black',
        isActive ? 'bg-blue text-white hover:text-white rounded p-2' : 'text-black/60'
      )}
    >
      {children}
    </Link>
  );
};