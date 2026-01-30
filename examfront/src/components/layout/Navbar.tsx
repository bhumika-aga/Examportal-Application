import { Moon, Sun, User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 h-16 flex items-center justify-between px-6 shadow-sm z-20">
      <div className="md:hidden">{/* Spacer for mobile menu button which is in Sidebar */}</div>

      <div className="flex items-center ml-auto space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-zinc-700">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.username}</p>
          </div>
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
            <UserIcon size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
