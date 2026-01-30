import { BookOpen, LayoutDashboard, List, LogOut, Menu, PlusCircle, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils";

interface SidebarProps {
  isAdmin?: boolean;
}

export default function Sidebar({ isAdmin = false }: SidebarProps) {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const adminItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Profile", icon: User, path: "/admin/profile" },
    { name: "Categories", icon: List, path: "/admin/categories" },
    { name: "Add Category", icon: PlusCircle, path: "/admin/add-category" },
    { name: "Quizzes", icon: BookOpen, path: "/admin/quizzes" },
    { name: "Add Quiz", icon: PlusCircle, path: "/admin/add-quiz" },
  ];

  const userItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/user-dashboard" },
    { name: "Profile", icon: User, path: "/user-dashboard/profile" },
    { name: "Load Quiz", icon: BookOpen, path: "/user-dashboard/0" }, // 0 means all/default
  ];

  const items = isAdmin ? adminItems : userItems;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed z-50 top-4 left-4 p-2 rounded-md bg-white dark:bg-zinc-800 shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transition-transform duration-300 transform md:transform-none flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Exam Portal
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/admin" &&
                  item.path !== "/user-dashboard" &&
                  location.pathname.startsWith(item.path));

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 dark:bg-zinc-700 text-indigo-700 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-zinc-900/50 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
