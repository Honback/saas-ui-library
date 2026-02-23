import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, Building2, BarChart3, Activity } from 'lucide-react';

const stats = [
  { name: 'Total Members', value: '—', icon: Users, change: '' },
  { name: 'Active Projects', value: '—', icon: Building2, change: '' },
  { name: 'API Calls', value: '—', icon: BarChart3, change: '' },
  { name: 'Uptime', value: '99.9%', icon: Activity, change: '' },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your workspace</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
                  <stat.icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12 text-gray-400">
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12" />
              <p className="mt-4 text-sm">No activity yet. Start building your SaaS!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
