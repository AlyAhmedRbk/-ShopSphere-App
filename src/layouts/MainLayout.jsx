import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-surface-dark transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          className: 'dark:bg-surface-dark-card dark:text-white text-sm',
        }}
      />
    </div>
  );
}
