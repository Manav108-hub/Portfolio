import '@/app/globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Link from 'next/link';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Manav Adwani | Cloud & DevOps Engineer',
  description: 'Portfolio of Manav Adwani, Cloud & DevOps Engineer specializing in AWS, Docker, Kubernetes, and modern web development.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
        <header className="fixed top-0 left-0 w-full z-50 bg-gray-50 bg-opacity-90 dark:bg-gray-950 dark:bg-opacity-90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-gray-50">MA.</Link>
              <ul className="hidden md:flex space-x-8">
                <li><Link href="#" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link href="#about" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">About</Link></li>
                <li><Link href="#projects" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Projects</Link></li>
                <li><Link href="#contact" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Contact</Link></li>
              </ul>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="md:hidden">
                  {/* Mobile menu button - in a real implementation, you'd add mobile menu functionality */}
                  <button className="p-2 text-gray-700 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="pt-16">{children}</main>

        <footer className="bg-gray-50 dark:bg-gray-950 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">Manav Adwani</h2>
                <p className="text-gray-600 dark:text-gray-400">Cloud & DevOps Engineer</p>
              </div>

              <div className="flex space-x-6">
                <a href="https://github.com/manav108-hub" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/manav-adwani-1146a221b/" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="mailto:manavadwani86@gmail.com"
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Manav Adwani. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

