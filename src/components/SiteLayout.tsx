import { Outlet } from 'react-router-dom';
import { TopNavBar } from '@/components/TopNavBar';
import { Footer } from '@/components/Footer';

export function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background pt-[60px]">
      <TopNavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
