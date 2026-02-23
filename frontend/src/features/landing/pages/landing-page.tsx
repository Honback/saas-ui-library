import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Users, BarChart3 } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Secure by Default', description: 'JWT authentication, RBAC, and tenant isolation built-in.' },
  { icon: Users, title: 'Multi-Tenant', description: 'Organization-based workspace management with member roles.' },
  { icon: BarChart3, title: 'Dashboard Ready', description: 'Pre-built dashboard layout with stats and activity feeds.' },
  { icon: Zap, title: 'Developer First', description: 'Clean architecture with React, Spring Boot, and Docker.' },
];

const pricingTiers = [
  { name: 'Starter', price: 'Free', features: ['Up to 5 members', '1 workspace', 'Basic analytics', 'Community support'] },
  { name: 'Pro', price: '$29/mo', features: ['Unlimited members', '10 workspaces', 'Advanced analytics', 'Priority support'], highlighted: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited everything', 'SSO / SAML', 'Audit logs', 'Dedicated support'] },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <span className="text-xl font-bold text-gray-900">SaaS App</span>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Build your SaaS
          <br />
          <span className="text-primary-600">faster than ever</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          A production-ready template with authentication, multi-tenancy, and team management.
          Start building your product, not your infrastructure.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link to="/signup">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <Button variant="outline" size="lg">View Demo</Button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Everything you need</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            All the essential SaaS features, ready to customize for your product.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                <feature.icon className="h-10 w-10 text-primary-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Simple pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Choose the plan that fits your needs. Upgrade anytime.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-xl border p-8 ${
                  tier.highlighted
                    ? 'border-primary-600 ring-2 ring-primary-600 shadow-lg'
                    : 'border-gray-200'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-4xl font-bold text-gray-900">{tier.price}</p>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-primary-600">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={tier.highlighted ? 'primary' : 'outline'}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} SaaS App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
