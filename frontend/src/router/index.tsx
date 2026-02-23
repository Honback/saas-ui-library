import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/features/home/pages/home-page';
import { ExplorePage } from '@/features/explore/pages/explore-page';
import { DetailPage } from '@/features/detail/pages/detail-page';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/explore', element: <ExplorePage /> },
      { path: '/explore/:category', element: <ExplorePage /> },
      { path: '/components/:slug', element: <DetailPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
