import Link from 'next/link';
import { ActiveLink } from '../active-link';
import { Logo } from '../logo';
import { Plus } from 'lucide-react';


export const Header = () => {

  return (
    <header className="flex h-28 items-center justify-between">      
          <Logo />      

          <nav className="flex items-center gap-6">
            <ActiveLink href="/">Início</ActiveLink>
            <ActiveLink href="/real-estate/list/buy">Comprar</ActiveLink>
            <ActiveLink href="/real-estate/list/rent">Alugar</ActiveLink>
            <ActiveLink href="/real-estate/list/all">Todos Imóveis</ActiveLink>
            <ActiveLink href="/about">Sobre Nós</ActiveLink>            
          </nav>     
          <Link href="/publish" className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">
            <Plus size={24} />
            Anuncie Seu Imóvel
          </Link>
    </header>
  );
};