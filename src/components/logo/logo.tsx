import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href="/" title="Página inicial">
      <Image src="/logo.webp" alt="Logo site" width={200} height={56} />
    </Link>
  );
};