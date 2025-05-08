// app/layout.tsx
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css'; // ✅ Ensure this line is present

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}