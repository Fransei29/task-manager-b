import "./globals.css";
import SessionProvider from './components/SessionProvider'; 
import Header from './components/Header/Header';

// Define metadata for the application
export const metadata = {
  title: "Task-Manager",
  description: "Manage your tasks!",
};

// Root layout component that wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>            {/* Provide session context to all components in the application */}
        <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}