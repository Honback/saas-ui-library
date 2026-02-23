import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/components/layout/root-layout';
import { AuthLayout } from '@/components/layout/auth-layout';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProtectedRoute } from '@/features/auth/components/protected-route';
import { LoginPage } from '@/features/auth/pages/login-page';
import { SignupPage } from '@/features/auth/pages/signup-page';
import { LandingPage } from '@/features/landing/pages/landing-page';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { SettingsPage } from '@/features/settings/pages/settings-page';
import { ProfileSettingsPage } from '@/features/settings/pages/profile-settings-page';
import { OrgSettingsPage } from '@/features/settings/pages/org-settings-page';
import { MembersPage } from '@/features/settings/pages/members-page';
import { SelectOrgPage } from '@/features/organization/pages/select-org-page';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },

      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: '/select-organization', element: <SelectOrgPage /> },
          {
            element: <DashboardLayout />,
            children: [
              { path: '/dashboard', element: <DashboardPage /> },
              {
                path: '/settings',
                element: <SettingsPage />,
                children: [
                  { index: true, element: <ProfileSettingsPage /> },
                  { path: 'profile', element: <ProfileSettingsPage /> },
                  { path: 'organization', element: <OrgSettingsPage /> },
                  { path: 'members', element: <MembersPage /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
