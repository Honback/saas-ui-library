import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Inbox,
  TrendingUp,
  Users,
  DollarSign,
  LayoutDashboard,
  Settings,
  FileText,
  BarChart3,
  ShoppingCart,
} from 'lucide-react';

// --- UI component imports ---
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/alert';
import { Tooltip } from '@/components/ui/tooltip';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { FileUpload } from '@/components/ui/file-upload';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { EmptyState } from '@/components/ui/empty-state';
import { StatsCard } from '@/components/ui/stats-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { GlassCard } from '@/components/ui/glass-card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Marquee } from '@/components/ui/marquee';
import { AnimatedBorder } from '@/components/ui/animated-border';
import { PricingCard } from '@/components/ui/pricing-card';
import { FeatureCard } from '@/components/ui/feature-card';
import { HoverExpandCard } from '@/components/ui/hover-expand-card';
import { ProfileCard } from '@/components/ui/profile-card';
import { GlowCard } from '@/components/ui/glow-card';
import { SkeuomorphicToggle } from '@/components/ui/skeuomorphic-toggle';
import { CosmicButton } from '@/components/ui/cosmic-button';
import { BrutalistButton } from '@/components/ui/brutalist-button';
import { HeartLikeButton } from '@/components/ui/heart-like-button';
import { ChaoticOrbitLoader } from '@/components/ui/chaotic-orbit-loader';
import { NeonSearchBar } from '@/components/ui/neon-search-bar';
import { LevelUpToast } from '@/components/ui/level-up-toast';
import { IdeSelector } from '@/components/ui/ide-selector';
import { FileUploadCard } from '@/components/ui/file-upload-card';
import { SocialTooltip } from '@/components/ui/social-tooltip';
import { HexPattern } from '@/components/ui/hex-pattern';

// ─── Types ────────────────────────────────────────
interface LivePreviewProps {
  slug: string;
  mode?: 'compact' | 'full';
  forceDark?: boolean;
  className?: string;
}

// ─── Main Component ───────────────────────────────
export function LivePreview({ slug, mode = 'compact', forceDark, className }: LivePreviewProps) {
  const Demo = demos[slug];
  if (!Demo) return <FallbackPreview />;

  const meta = demoMeta[slug];
  const bgClass = forceDark
    ? 'bg-gray-950'
    : meta?.dark
      ? 'bg-gray-950'
      : meta?.gradient
        ? meta.gradient
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50';

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        mode === 'compact' && 'h-48 rounded-t-xl',
        mode === 'full' && 'min-h-[360px] rounded-xl border border-gray-200',
        bgClass,
        className
      )}
    >
      <div className={cn('w-full', mode === 'compact' ? 'scale-[0.85] p-2' : 'p-8')}>
        <Demo />
      </div>
    </div>
  );
}

function FallbackPreview() {
  return (
    <div className="flex h-full items-center justify-center rounded-xl bg-gray-50">
      <div className="h-12 w-12 rounded-xl bg-gray-200" />
    </div>
  );
}

// ─── Demo metadata ────────────────────────────────
const demoMeta: Record<string, { dark?: boolean; gradient?: string }> = {
  'shimmer-button': { dark: true },
  'glass-card': { gradient: 'bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500' },
  'interactive-showcase': { dark: true },
  'neon-search-bar': { dark: true },
  'hex-pattern': { dark: true },
};

// ─── BASIC UI ─────────────────────────────────────

function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger" size="sm">Danger</Button>
    </div>
  );
}

function InputDemo() {
  const [val, setVal] = useState('');
  return (
    <div className="mx-auto flex max-w-xs flex-col gap-3">
      <Input label="Email" placeholder="you@example.com" value={val} onChange={e => setVal(e.target.value)} />
      <Input label="Password" type="password" error="Password is required" />
    </div>
  );
}

function CardDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            This is a card component with header and content sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex items-end justify-center gap-4">
      <Avatar name="Kim Min" size="sm" />
      <Avatar name="Lee Su" size="md" />
      <Avatar name="Park J" size="lg" />
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex items-end justify-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}

// ─── INTERACTIVE UI ───────────────────────────────

function ModalDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <div className="relative rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-100 px-4 py-3">
          <h3 className="font-semibold text-gray-900">Confirm Action</h3>
        </div>
        <div className="px-4 py-4">
          <p className="text-sm text-gray-600">Are you sure you want to proceed? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-100 px-4 py-3">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Confirm</Button>
        </div>
      </div>
    </div>
  );
}

function DropdownDemo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button variant="outline" size="sm">Options ▾</Button>
      <div className="w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
        {['Edit', 'Duplicate', 'Archive'].map((item) => (
          <button
            key={item}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
          >
            {item}
          </button>
        ))}
        <div className="my-1 border-t border-gray-100" />
        <button className="w-full px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
}

function TabsDemo() {
  const [tab, setTab] = useState('overview');
  return (
    <div className="mx-auto max-w-sm">
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="overview">Overview</Tab>
          <Tab value="features">Features</Tab>
          <Tab value="pricing">Pricing</Tab>
        </TabList>
        <TabPanel value="overview">
          <p className="py-3 text-sm text-gray-600">Welcome to the overview section.</p>
        </TabPanel>
        <TabPanel value="features">
          <p className="py-3 text-sm text-gray-600">Explore our powerful features.</p>
        </TabPanel>
        <TabPanel value="pricing">
          <p className="py-3 text-sm text-gray-600">Simple, transparent pricing.</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

function ToggleDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <Toggle checked={a} onChange={setA} label="Dark mode" />
      <Toggle checked={b} onChange={setB} label="Notifications" />
    </div>
  );
}

function SelectDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <Select
        label="Country"
        placeholder="Select a country"
        options={[
          { value: 'kr', label: 'South Korea' },
          { value: 'us', label: 'United States' },
          { value: 'jp', label: 'Japan' },
          { value: 'gb', label: 'United Kingdom' },
        ]}
      />
    </div>
  );
}

function TextareaDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <Textarea label="Message" placeholder="Write your message here..." rows={3} />
    </div>
  );
}

// ─── FEEDBACK ─────────────────────────────────────

function AlertDemo() {
  return (
    <div className="mx-auto flex max-w-sm flex-col gap-2">
      <Alert variant="info" title="Info">Check out the new update.</Alert>
      <Alert variant="success" title="Success">Your changes have been saved.</Alert>
      <Alert variant="warning" title="Warning">Storage is almost full.</Alert>
      <Alert variant="error" title="Error">Failed to delete the resource.</Alert>
    </div>
  );
}

function TooltipDemo() {
  return (
    <div className="flex items-center justify-center gap-6">
      <Tooltip content="Top tooltip" position="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
    </div>
  );
}

function ToastDemo() {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-end gap-2">
      <div className="flex w-full items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 shadow-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="text-sm font-medium text-green-800">Changes saved successfully</span>
      </div>
      <div className="flex w-full items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 shadow-sm">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <span className="text-sm font-medium text-red-800">Something went wrong</span>
      </div>
    </div>
  );
}

function LoadingStatesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Spinner size="lg" />
      <div className="w-48 space-y-2 animate-pulse">
        <div className="h-3 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="h-10 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

function ErrorStatesDemo() {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <span className="text-xl">!</span>
      </div>
      <h3 className="font-semibold text-gray-900">Something went wrong</h3>
      <p className="text-sm text-gray-500">We couldn't load the data. Please try again.</p>
      <Button variant="primary" size="sm">Retry</Button>
    </div>
  );
}

// ─── DATA DISPLAY ─────────────────────────────────

function TableDemo() {
  const data = [
    { name: 'Alice Kim', email: 'alice@test.com', role: 'Admin' },
    { name: 'Bob Lee', email: 'bob@test.com', role: 'Editor' },
    { name: 'Carol Park', email: 'carol@test.com', role: 'Viewer' },
  ];
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.email}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell>
                <Badge variant={r.role === 'Admin' ? 'success' : 'default'}>{r.role}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StatsCardDemo() {
  return (
    <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
      <StatsCard title="Revenue" value="$12,340" change="+12.5%" changeType="positive" icon={DollarSign} />
      <StatsCard title="Users" value="1,234" change="+5.2%" changeType="positive" icon={Users} />
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex justify-center">
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <EmptyState
        icon={Inbox}
        title="No items yet"
        description="Get started by creating your first item."
        action={<Button variant="primary" size="sm">Create Item</Button>}
      />
    </div>
  );
}

function ListDemo() {
  const items = [
    { name: 'Alice Kim', desc: 'Product Designer', status: 'Active' },
    { name: 'Bob Lee', desc: 'Developer', status: 'Active' },
    { name: 'Carol Park', desc: 'Marketing', status: 'Away' },
  ];
  return (
    <div className="mx-auto max-w-xs divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50">
          <Avatar name={item.name} size="sm" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-xs text-gray-500">{item.desc}</p>
          </div>
          <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge>
        </div>
      ))}
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────

function BreadcrumbsDemo() {
  return (
    <div className="flex justify-center">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '#' },
          { label: 'Products', href: '#' },
          { label: 'Electronics', href: '#' },
          { label: 'Laptops' },
        ]}
      />
    </div>
  );
}

function TabBarDemo() {
  const [tab, setTab] = useState('home');
  return (
    <div className="mx-auto max-w-sm">
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="home">Home</Tab>
          <Tab value="explore">Explore</Tab>
          <Tab value="library">Library</Tab>
          <Tab value="profile">Profile</Tab>
        </TabList>
      </Tabs>
    </div>
  );
}

function SearchInputDemo() {
  const [val, setVal] = useState('');
  return (
    <div className="mx-auto max-w-xs">
      <SearchInput value={val} onChange={setVal} onClear={() => setVal('')} placeholder="Search components..." />
    </div>
  );
}

function SidebarDemo() {
  const [active, setActive] = useState('dashboard');
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <div className="mx-auto flex h-48 w-full max-w-xs overflow-hidden rounded-lg border border-gray-200">
      <div className="w-44 border-r border-gray-200 bg-white p-3">
        <div className="mb-4 text-sm font-bold text-gray-900">My App</div>
        <nav className="space-y-1">
          {items.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                active === id
                  ? 'bg-primary-50 font-medium text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 bg-gray-50 p-4">
        <div className="text-xs text-gray-400">Content area</div>
      </div>
    </div>
  );
}

function TopbarDemo() {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-bold text-gray-900">MyApp</span>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <button className="transition-colors hover:text-gray-900">Dashboard</button>
          <button className="transition-colors hover:text-gray-900">Products</button>
          <button className="transition-colors hover:text-gray-900">Settings</button>
        </div>
        <Avatar name="User" size="sm" />
      </div>
    </div>
  );
}

// ─── FORMS ────────────────────────────────────────

function LoginFormDemo() {
  return (
    <div className="mx-auto max-w-xs rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-semibold">Sign In</h3>
      <div className="space-y-3">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button variant="primary" className="w-full">Sign In</Button>
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">
        Don't have an account? <button className="text-primary-600">Sign up</button>
      </p>
    </div>
  );
}

function SignupFormDemo() {
  return (
    <div className="mx-auto max-w-xs rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-semibold">Create Account</h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Input label="First" placeholder="John" />
          <Input label="Last" placeholder="Doe" />
        </div>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Button variant="primary" className="w-full">Create Account</Button>
      </div>
    </div>
  );
}

function SettingsFormDemo() {
  const [notify, setNotify] = useState(true);
  return (
    <div className="mx-auto max-w-xs rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Settings</h3>
      <div className="space-y-3">
        <Input label="Display Name" defaultValue="John Doe" />
        <Select
          label="Language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'ko', label: 'Korean' },
          ]}
        />
        <Toggle checked={notify} onChange={setNotify} label="Email notifications" />
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="sm">Save</Button>
        </div>
      </div>
    </div>
  );
}

function FileUploadDemo() {
  return (
    <div className="mx-auto max-w-xs">
      <FileUpload onFileSelect={() => {}} accept="image/*" />
    </div>
  );
}

// ─── LAYOUTS ──────────────────────────────────────

function AuthLayoutDemo() {
  return (
    <div className="flex h-40 items-center justify-center rounded-lg bg-gray-100">
      <div className="w-48 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-center text-sm font-semibold">Welcome Back</h3>
        <div className="space-y-2">
          <div className="h-7 rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-7 rounded-md border border-gray-200 bg-gray-50" />
          <div className="h-7 rounded-md bg-primary-600" />
        </div>
      </div>
    </div>
  );
}

function DashboardLayoutDemo() {
  return (
    <div className="mx-auto flex h-40 max-w-sm overflow-hidden rounded-lg border border-gray-200">
      <div className="w-28 space-y-1 border-r border-gray-200 bg-white p-2">
        <div className="h-3 w-16 rounded bg-gray-800" />
        {['Dashboard', 'Users', 'Settings'].map((t, i) => (
          <div key={t} className={cn('rounded px-2 py-1 text-[10px]', i === 0 ? 'bg-primary-50 text-primary-700' : 'text-gray-500')}>
            {t}
          </div>
        ))}
      </div>
      <div className="flex-1 bg-gray-50 p-3">
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map(i => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-2">
              <div className="h-1.5 w-8 rounded bg-gray-400" />
              <div className="mt-1 h-3 w-12 rounded bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────

function LandingPageDemo() {
  return (
    <div className="mx-auto max-w-sm space-y-4 text-center">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Build faster with components</h3>
        <p className="mt-1 text-xs text-gray-500">Production-ready UI components for your next project.</p>
        <div className="mt-2 flex justify-center gap-2">
          <Button variant="primary" size="sm">Get Started</Button>
          <Button variant="outline" size="sm">Learn More</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['Fast', 'Secure', 'Modern'].map(t => (
          <div key={t} className="rounded-lg border border-gray-200 bg-white p-2">
            <div className="text-xs font-medium text-gray-700">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPageDemo() {
  return (
    <div className="mx-auto max-w-md space-y-3">
      <h3 className="text-sm font-bold text-gray-900">Dashboard</h3>
      <div className="grid grid-cols-3 gap-2">
        <StatsCard title="Users" value="1,234" change="+12%" changeType="positive" icon={Users} />
        <StatsCard title="Revenue" value="$5.2K" change="+8%" changeType="positive" icon={TrendingUp} />
        <StatsCard title="Orders" value="342" change="-2%" changeType="negative" icon={ShoppingCart} />
      </div>
    </div>
  );
}

function SettingsPageDemo() {
  const [tab, setTab] = useState('general');
  return (
    <div className="mx-auto max-w-sm">
      <h3 className="mb-2 text-sm font-bold text-gray-900">Settings</h3>
      <Tabs value={tab} onChange={setTab}>
        <TabList>
          <Tab value="general">General</Tab>
          <Tab value="security">Security</Tab>
          <Tab value="billing">Billing</Tab>
        </TabList>
        <TabPanel value="general">
          <div className="space-y-2 pt-3">
            <Input label="Name" defaultValue="John Doe" />
            <div className="flex justify-end">
              <Button variant="primary" size="sm">Save</Button>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="security">
          <p className="pt-3 text-sm text-gray-500">Security settings here.</p>
        </TabPanel>
        <TabPanel value="billing">
          <p className="pt-3 text-sm text-gray-500">Billing settings here.</p>
        </TabPanel>
      </Tabs>
    </div>
  );
}

// ─── TRENDY COMPONENTS ────────────────────────────

function GradientButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <GradientButton variant="purple">Purple</GradientButton>
      <GradientButton variant="sunset">Sunset</GradientButton>
      <GradientButton variant="ocean">Ocean</GradientButton>
      <GradientButton variant="emerald">Emerald</GradientButton>
    </div>
  );
}

function ShimmerButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ShimmerButton size="sm">Small</ShimmerButton>
      <ShimmerButton size="md">Get Started</ShimmerButton>
      <ShimmerButton size="lg">Explore Now</ShimmerButton>
    </div>
  );
}

function GlassCardDemo() {
  return (
    <div className="flex justify-center">
      <GlassCard className="max-w-xs p-5">
        <h3 className="font-semibold text-white">Glass Card</h3>
        <p className="mt-1 text-sm text-white/80">
          Beautiful frosted glass effect with backdrop blur.
        </p>
      </GlassCard>
    </div>
  );
}

function SpotlightCardDemo() {
  return (
    <div className="flex justify-center">
      <SpotlightCard className="max-w-xs">
        <h3 className="font-semibold text-gray-900">Spotlight Card</h3>
        <p className="mt-1 text-sm text-gray-500">
          Hover to see the spotlight follow your cursor.
        </p>
      </SpotlightCard>
    </div>
  );
}

function BentoGridDemo() {
  return (
    <div className="mx-auto max-w-md">
      <BentoGrid columns={3}>
        <BentoItem colSpan={2} rowSpan={2} title="Analytics" description="Real-time metrics" icon={<BarChart3 className="h-5 w-5" />} gradient="bg-gradient-to-br from-purple-50 to-purple-100" />
        <BentoItem title="Users" icon={<Users className="h-5 w-5" />} gradient="bg-gradient-to-br from-blue-50 to-blue-100" />
        <BentoItem title="Reports" icon={<FileText className="h-5 w-5" />} gradient="bg-gradient-to-br from-pink-50 to-pink-100" />
        <BentoItem colSpan={2} title="Settings" description="Configure your workspace" icon={<Settings className="h-5 w-5" />} gradient="bg-gradient-to-br from-green-50 to-green-100" />
        <BentoItem title="Sales" icon={<DollarSign className="h-5 w-5" />} gradient="bg-gradient-to-br from-yellow-50 to-yellow-100" />
      </BentoGrid>
    </div>
  );
}

function AnimatedCounterDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="text-center">
      <div className="flex items-end justify-center gap-8">
        <div>
          <AnimatedCounter key={`a-${key}`} value={12345} prefix="$" className="text-3xl font-bold text-gray-900" />
          <p className="mt-1 text-xs text-gray-500">Revenue</p>
        </div>
        <div>
          <AnimatedCounter key={`b-${key}`} value={99} suffix="%" className="text-3xl font-bold text-emerald-600" />
          <p className="mt-1 text-xs text-gray-500">Uptime</p>
        </div>
        <div>
          <AnimatedCounter key={`c-${key}`} value={5678} className="text-3xl font-bold text-blue-600" />
          <p className="mt-1 text-xs text-gray-500">Users</p>
        </div>
      </div>
      <button onClick={() => setKey(k => k + 1)} className="mt-3 text-xs text-primary-600 underline">
        Replay animation
      </button>
    </div>
  );
}

function MarqueeDemo() {
  const logos = ['React', 'Vue', 'Svelte', 'Angular', 'Next.js', 'Nuxt', 'Remix', 'Astro'];
  return (
    <Marquee speed="normal" pauseOnHover>
      {logos.map((name) => (
        <div
          key={name}
          className="flex h-10 items-center rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700"
        >
          {name}
        </div>
      ))}
    </Marquee>
  );
}

function AnimatedBorderDemo() {
  return (
    <div className="flex justify-center">
      <AnimatedBorder>
        <h3 className="font-semibold text-gray-900">Animated Border</h3>
        <p className="mt-1 text-sm text-gray-500">
          A rotating gradient border with blur glow effect.
        </p>
      </AnimatedBorder>
    </div>
  );
}

function InteractiveShowcaseDemo() {
  const [active, setActive] = useState(0);
  const items = [
    { n: '01', lines: ['Gourmet', 'Burgers'], color: 'text-orange-500' },
    { n: '02', lines: ['Fresh', 'Desserts'], color: 'text-rose-500' },
    { n: '03', lines: ['Artisan', 'Waffles'], color: 'text-amber-500' },
  ];
  return (
    <div className="flex items-center gap-6 px-4">
      <div className="space-y-4">
        {items.map((item, i) => (
          <button key={i} onClick={() => setActive(i)} className="flex items-start gap-2 text-left">
            <span className={cn('text-lg font-bold transition-all', active === i ? item.color : 'text-zinc-500')}>
              {item.n}
            </span>
            <div className={cn('text-xl font-black uppercase leading-tight tracking-tighter transition-all', active === i ? 'text-white opacity-100' : 'text-zinc-600 opacity-40')}>
              {item.lines.map((l, j) => <div key={j}>{l}</div>)}
            </div>
          </button>
        ))}
      </div>
      <div className="relative flex-1">
        <div className="h-32 w-32 overflow-hidden rounded-2xl bg-gray-800">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <clipPath id="demo-burger">
                <path d="M92,39H8v-7c0-9.5,7.7-17.2,17.2-17.2h49.3C84.2,14.8,92,22.5,92,32V39z" />
                <rect x="4" y="42" width="92" height="4" rx="2" />
                <rect x="8" y="49" width="84" height="13" rx="6" />
                <rect x="3" y="65" width="94" height="4" rx="2" />
                <path d="M88,85H12c-2,0-3.5-1.6-3.5-3.5V74h83v7.5C91.5,83.4,90,85,88,85z" />
              </clipPath>
              <clipPath id="demo-grid">
                {[0,1,2].flatMap(r => [0,1,2].map(c => (
                  <rect key={`${r}-${c}`} x={5 + c * 33} y={5 + r * 33} width="28" height="28" rx="3" />
                )))}
              </clipPath>
              <clipPath id="demo-bento">
                <rect x="5" y="5" width="55" height="58" rx="5" />
                <rect x="65" y="5" width="30" height="27" rx="5" />
                <rect x="65" y="37" width="30" height="26" rx="5" />
                <rect x="5" y="68" width="90" height="27" rx="5" />
              </clipPath>
            </defs>
            <g clipPath={`url(#demo-${['burger','bento','grid'][active]})`} style={{ transition: 'clip-path 0.5s' }}>
              <rect width="100" height="100" fill={['#f97316','#f43f5e','#f59e0b'][active]} />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Uiverse Card Demos ──────────────────────────

function PricingCardDemo() {
  return (
    <PricingCard
      price="$150/hr"
      title="Senior Backend Engineer"
      description="Full-time position"
      icon={<BarChart3 className="h-5 w-5 text-gray-600" />}
      actionLabel="View"
    />
  );
}

function FeatureCardDemo() {
  return (
    <FeatureCard
      number="01"
      title="Abstract Design"
      description="Build beautiful interfaces with reusable components and modern patterns."
      icon={<LayoutDashboard className="h-8 w-8" />}
    />
  );
}

function HoverExpandCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <HoverExpandCard
        title="Welcome to SaaS UI"
        subtitle="Start building:"
        highlight="Today"
        accentColor="bg-amber-400"
      />
    </div>
  );
}

function ProfileCardDemo() {
  return (
    <div className="flex gap-4">
      <ProfileCard
        name="Jane Doe"
        role="Frontend Dev"
        actionLabel="Follow"
      />
      <ProfileCard
        name="John Smith"
        role="Designer"
        gradient="from-emerald-500 via-teal-500 to-cyan-400"
        actionLabel="Follow"
      />
    </div>
  );
}

function GlowCardDemo() {
  return (
    <GlowCard
      title="SAAS UI"
      heading="Love to Code."
      description="Build beautiful interfaces with reusable components. Copy and paste into your project."
    />
  );
}

function SkeuomorphicToggleDemo() {
  return <SkeuomorphicToggle />;
}

function CosmicButtonDemo() {
  return <CosmicButton>Hover Me!</CosmicButton>;
}

function BrutalistButtonDemo() {
  return <BrutalistButton />;
}

function HeartLikeButtonDemo() {
  return (
    <div className="flex items-center gap-8">
      <HeartLikeButton />
    </div>
  );
}

function ChaoticOrbitLoaderDemo() {
  return (
    <div className="flex items-center gap-8">
      <ChaoticOrbitLoader size={30} color="#6366f1" />
      <ChaoticOrbitLoader size={40} color="#ec4899" />
      <ChaoticOrbitLoader size={50} color="#14b8a6" />
    </div>
  );
}

function NeonSearchBarDemo() {
  return <NeonSearchBar placeholder="Search..." />;
}

function LevelUpToastDemo() {
  return <LevelUpToast />;
}

function IdeSelectorDemo() {
  return <IdeSelector />;
}

function FileUploadCardDemo() {
  return <FileUploadCard />;
}

function SocialTooltipDemo() {
  return <SocialTooltip />;
}

function HexPatternDemo() {
  return <HexPattern className="h-full w-full rounded-lg" />;
}

// ─── Registry ─────────────────────────────────────

const demos: Record<string, React.FC> = {
  // Basic UI
  button: ButtonDemo,
  input: InputDemo,
  card: CardDemo,
  badge: BadgeDemo,
  avatar: AvatarDemo,
  spinner: SpinnerDemo,

  // Interactive UI
  modal: ModalDemo,
  dropdown: DropdownDemo,
  tabs: TabsDemo,
  toggle: ToggleDemo,
  select: SelectDemo,
  textarea: TextareaDemo,

  // Feedback
  alert: AlertDemo,
  tooltip: TooltipDemo,
  toast: ToastDemo,
  'loading-states': LoadingStatesDemo,
  'error-states': ErrorStatesDemo,

  // Data Display
  table: TableDemo,
  'stats-card': StatsCardDemo,
  pagination: PaginationDemo,
  'empty-state': EmptyStateDemo,
  list: ListDemo,

  // Navigation
  breadcrumbs: BreadcrumbsDemo,
  'tab-bar': TabBarDemo,
  'search-input': SearchInputDemo,
  sidebar: SidebarDemo,
  topbar: TopbarDemo,

  // Forms
  'login-form': LoginFormDemo,
  'signup-form': SignupFormDemo,
  'settings-form': SettingsFormDemo,
  'file-upload': FileUploadDemo,

  // Layouts
  'auth-layout': AuthLayoutDemo,
  'dashboard-layout': DashboardLayoutDemo,

  // Pages
  'landing-page': LandingPageDemo,
  'dashboard-page': DashboardPageDemo,
  'settings-page': SettingsPageDemo,

  // Trendy
  'gradient-button': GradientButtonDemo,
  'shimmer-button': ShimmerButtonDemo,
  'glass-card': GlassCardDemo,
  'spotlight-card': SpotlightCardDemo,
  'bento-grid': BentoGridDemo,
  'animated-counter': AnimatedCounterDemo,
  marquee: MarqueeDemo,
  'animated-border': AnimatedBorderDemo,
  'interactive-showcase': InteractiveShowcaseDemo,
  'pricing-card': PricingCardDemo,
  'feature-card': FeatureCardDemo,
  'hover-expand-card': HoverExpandCardDemo,
  'profile-card': ProfileCardDemo,
  'glow-card': GlowCardDemo,
  'skeuomorphic-toggle': SkeuomorphicToggleDemo,
  'cosmic-button': CosmicButtonDemo,
  'brutalist-button': BrutalistButtonDemo,
  'heart-like-button': HeartLikeButtonDemo,
  'chaotic-orbit-loader': ChaoticOrbitLoaderDemo,
  'neon-search-bar': NeonSearchBarDemo,
  'level-up-toast': LevelUpToastDemo,
  'ide-selector': IdeSelectorDemo,
  'file-upload-card': FileUploadCardDemo,
  'social-tooltip': SocialTooltipDemo,
  'hex-pattern': HexPatternDemo,
};
