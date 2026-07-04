import { LogOut } from 'lucide-react'

export default async function Admin() {
  return (
    <div>
        <span>Admin</span>
        <a href="/api/auth/sign-out">
            <LogOut className="mr-2 size-4" />
            Sign Out
        </a>
    </div>
  )
}