import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import type { Organization, CreateOrganizationRequest } from '@/types/organization';
import type { ApiResponse } from '@/types/api';

interface OrganizationState {
  organizations: Organization[];
  currentOrg: Organization | null;
  isLoading: boolean;
  fetchOrganizations: () => Promise<void>;
  setCurrentOrg: (org: Organization) => void;
  createOrganization: (data: CreateOrganizationRequest) => Promise<Organization>;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: [],
  currentOrg: null,
  isLoading: false,

  fetchOrganizations: async () => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.get<ApiResponse<Organization[]>>('/organizations');
      const orgs = data.data;
      set({ organizations: orgs, isLoading: false });

      const savedOrgId = localStorage.getItem('current_organization_id');
      if (savedOrgId) {
        const savedOrg = orgs.find((o) => o.id === savedOrgId);
        if (savedOrg) {
          set({ currentOrg: savedOrg });
        }
      }
    } catch {
      set({ isLoading: false });
    }
  },

  setCurrentOrg: (org) => {
    localStorage.setItem('current_organization_id', org.id);
    set({ currentOrg: org });
  },

  createOrganization: async (reqData) => {
    const { data } = await apiClient.post<ApiResponse<Organization>>('/organizations', reqData);
    const newOrg = data.data;
    set((state) => ({
      organizations: [...state.organizations, newOrg],
      currentOrg: newOrg,
    }));
    localStorage.setItem('current_organization_id', newOrg.id);
    return newOrg;
  },
}));
