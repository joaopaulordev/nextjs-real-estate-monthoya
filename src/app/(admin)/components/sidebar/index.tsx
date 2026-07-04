import { BarChart, CheckSquare, Cog, Flag, Home, LifeBuoy, Search, SquareStack, Users } from 'lucide-react'
import { NavItem } from './navItem'
import { Profile } from './profile' 

export function Sidebar() {

  return (
    <div className="flex flex-col gap-6 items-center justify-stretch h-full w-70 mt-3">    
        
        <nav className="space-y-0.5">          
          <NavItem title="Home" icon={Home} />
          <NavItem title="Dashboard" icon={BarChart} />
          <NavItem title="Projects" icon={SquareStack} />
          <NavItem title="Tasks" icon={CheckSquare} />
          <NavItem title="Reporting" icon={Flag} />
          <NavItem title="Users" icon={Users} />
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <nav className="space-y-0.5">
            <NavItem title="Support" icon={LifeBuoy} />
            <NavItem title="Settings" icon={Cog} />
          </nav>

           <div className="h-px bg-zinc-200" />
           
          <Profile />
        </div>
    </div>
  )
}