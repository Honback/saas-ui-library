import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Building2, Plus } from 'lucide-react';
import { useOrganizationStore } from '@/stores/organization-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const createOrgSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(3, 'Slug must be at least 3 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Only lowercase letters, numbers, and hyphens'),
});

type CreateOrgForm = z.infer<typeof createOrgSchema>;

export function SelectOrgPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { organizations, fetchOrganizations, setCurrentOrg, createOrganization } = useOrganizationStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreateOrgForm>({
    resolver: zodResolver(createOrgSchema),
  });

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  const nameValue = watch('name');
  useEffect(() => {
    if (nameValue) {
      setValue('slug', nameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  }, [nameValue, setValue]);

  const handleSelectOrg = (org: typeof organizations[0]) => {
    setCurrentOrg(org);
    navigate('/dashboard');
  };

  const onSubmit = async (data: CreateOrgForm) => {
    setIsSubmitting(true);
    try {
      const org = await createOrganization(data);
      toast.success('Organization created!');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to create organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Select Organization</h1>
          <p className="mt-2 text-sm text-gray-500">Choose a workspace or create a new one</p>
        </div>

        {organizations.length > 0 && (
          <div className="space-y-3">
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => handleSelectOrg(org)}
                className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 text-left transition-colors hover:border-primary-300 hover:bg-primary-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{org.name}</p>
                  <p className="text-sm text-gray-500">{org.slug}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showCreate ? (
          <Button variant="outline" className="w-full" onClick={() => setShowCreate(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Organization
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Create Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  id="name"
                  label="Organization Name"
                  placeholder="My Company"
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  id="slug"
                  label="URL Slug"
                  placeholder="my-company"
                  error={errors.slug?.message}
                  {...register('slug')}
                />
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
