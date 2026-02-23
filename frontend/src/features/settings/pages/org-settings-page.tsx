import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useOrganizationStore } from '@/stores/organization-store';
import apiClient from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function OrgSettingsPage() {
  const { currentOrg, fetchOrganizations } = useOrganizationStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: currentOrg?.name || '',
    },
  });

  const onSubmit = async (data: { name: string }) => {
    if (!currentOrg) return;
    setIsSubmitting(true);
    try {
      await apiClient.put(`/organizations/${currentOrg.id}`, data);
      await fetchOrganizations();
      toast.success('Organization updated');
    } catch {
      toast.error('Failed to update organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentOrg) {
    return <p className="text-gray-500">No organization selected.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
          <Input id="slug" label="Slug" value={currentOrg.slug} disabled />
          <Input id="name" label="Name" {...register('name')} />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
