import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ChevronDown } from 'lucide-react';
import { useOrganizationStore } from '@/stores/organization-store';

export function OrgSwitcher() {
  const { organizations, currentOrg, fetchOrganizations, setCurrentOrg } = useOrganizationStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return (
    <div className="relative">
      <select
        value={currentOrg?.id || ''}
        onChange={(e) => {
          const org = organizations.find((o) => o.id === e.target.value);
          if (org) {
            setCurrentOrg(org);
          } else if (e.target.value === 'new') {
            navigate('/select-organization');
          }
        }}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name}
          </option>
        ))}
        <option value="new">+ New Organization</option>
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
