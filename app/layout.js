import "./globals.css";
import SessionProvider from '../components/SessionProvider'; 

export const metadata = {
  title: "Task-Manager",
  description: "Manage your tasks!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}