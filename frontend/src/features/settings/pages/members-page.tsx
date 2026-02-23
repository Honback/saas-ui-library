import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useOrganizationStore } from '@/stores/organization-store';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus } from 'lucide-react';
import type { Member } from '@/types/member';
import type { ApiResponse } from '@/types/api';

export function MembersPage() {
  const { currentOrg } = useOrganizationStore();
  const [members, setMembers] = useState<Member[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    if (currentOrg) {
      apiClient
        .get<ApiResponse<Member[]>>(`/organizations/${currentOrg.id}/members`)
        .then(({ data }) => setMembers(data.data))
        .catch(() => toast.error('Failed to load members'));
    }
  }, [currentOrg]);

  const handleInvite = async () => {
    if (!currentOrg || !inviteEmail) return;
    setIsInviting(true);
    try {
      await apiClient.post(`/organizations/${currentOrg.id}/members/invite`, {
        email: inviteEmail,
        role: 'MEMBER',
      });
      toast.success('Invitation sent!');
      setInviteEmail('');
      setShowInvite(false);
    } catch {
      toast.error('Failed to send invitation');
    } finally {
      setIsInviting(false);
    }
  };

  const roleBadgeVariant = (role: string) => {
    if (role === 'OWNER') return 'danger' as const;
    if (role === 'ADMIN') return 'warning' as const;
    return 'default' as const;
  };

  if (!currentOrg) {
    return <p className="text-gray-500">No organization selected.</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Members</CardTitle>
          <Button size="sm" onClick={() => setShowInvite(!showInvite)}>
            <UserPlus className="mr-2 h-4 w-4" /> Invite
          </Button>
        </CardHeader>
        <CardContent>
          {showInvite && (
            <div className="mb-6 flex gap-3">
              <Input
                placeholder="email@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleInvite} disabled={isInviting}>
                {isInviting ? 'Sending...' : 'Send Invite'}
              </Button>
            </div>
          )}

          <div className="divide-y divide-gray-100">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={`${member.firstName} ${member.lastName}`}
                    src={member.avatarUrl}
                    size="sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <Badge variant={roleBadgeVariant(member.role)}>{member.role}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
