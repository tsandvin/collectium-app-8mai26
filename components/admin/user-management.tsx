'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { updateUserRole } from '@/app/actions/collectium'
import { User, Shield, ShieldOff } from 'lucide-react'
import type { User as UserType } from '@/lib/db/schema'

interface UserManagementProps {
  users: UserType[]
}

export function UserManagement({ users }: UserManagementProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: string) => {
    setLoading(userId)
    try {
      await updateUserRole(userId, newRole)
      router.refresh()
    } catch (err) {
      console.error('Failed to update role:', err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-6">Brukere</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bruker</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">E-post</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Rolle</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registrert</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {user.role === 'admin' && <Shield className="h-3 w-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-muted-foreground">
                  {user.createdAt.toLocaleDateString('nb-NO')}
                </td>
                <td className="py-4 px-4 text-right">
                  {user.role === 'admin' ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRoleChange(user.id, 'member')}
                      disabled={loading === user.id}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <ShieldOff className="h-4 w-4 mr-1" />
                      Fjern admin
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRoleChange(user.id, 'admin')}
                      disabled={loading === user.id}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      Gjor admin
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
