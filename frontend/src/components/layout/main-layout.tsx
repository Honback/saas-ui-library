import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Navbar } from './navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
