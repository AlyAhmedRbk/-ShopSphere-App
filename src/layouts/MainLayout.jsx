import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Toaster } from 'react-hot-toast';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-900 transition-colors duration-500">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#111118',
            color: '#fff',
            borderRadius: '20px',
            border: '1px solid #2d2d4e',
            fontSize: '14px',
            fontWeight: '900',
          },
        }}
      />
    </div>
  );
}
