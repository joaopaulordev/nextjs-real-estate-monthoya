import { BarChart, CheckSquare, Cog, Flag, Home, LifeBuoy, Search, SquareStack, Users } from 'lucide-react'
import { NavItem } from './navItem'
import { Profile } from './profile' 
import { ActiveLink } from '@/components/active-link'

export function Sidebar() {

  return (   
    <nav className="flex flex-col gap-3 text-center">                    
      <ActiveLink href="/admin">Home</ActiveLink>
      <ActiveLink href="/admin/finalidade">Finalidade</ActiveLink>
      <ActiveLink href="/admin/imovel">Imóvel</ActiveLink>
      <ActiveLink href="/admin/usuarios">Usuários</ActiveLink>
      <ActiveLink href="/admin/settings">Configurações</ActiveLink>

      <div className="h-px bg-zinc-200" />
      
      <Profile />
    </nav>
  )
}