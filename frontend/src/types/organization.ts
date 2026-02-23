export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  ownerId: string;
  createdAt: string;
}

export interface CreateOrganizationRequest {
  name: string;
  slug: string;
}
