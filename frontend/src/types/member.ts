export type MemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';

export interface Member {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  role: MemberRole;
  joinedAt: string;
}
