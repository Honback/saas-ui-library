import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { name: 'Profile', href: '/settings/profile' },
  { name: 'Organization', href: '/settings/organization' },
  { name: 'Members', href: '/settings/members' },
];

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and organization</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.href}
              className={({ isActive }) =>
                `border-b-2 px-1 pb-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
