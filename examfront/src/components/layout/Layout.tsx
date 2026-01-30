import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const isAdmin = user?.authorities.some((a) => a.authority === "ADMIN");

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-zinc-900 overflow-hidden">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-zinc-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
