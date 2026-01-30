import { CheckCircle, Mail, Shield, Smartphone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        User details not available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
        {/* Header / Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

        <div className="px-8 pb-8">
          {/* Avatar & Basic Info */}
          <div className="relative flex items-end -mt-16 mb-6">
            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-zinc-800 bg-gray-200 dark:bg-zinc-700 overflow-hidden shadow-lg">
              <img
                src={
                  user.profile === "default.png" || !user.profile
                    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user.username
                    : user.profile
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-6 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-zinc-700">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mr-4 text-indigo-600 dark:text-indigo-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mr-4 text-purple-600 dark:text-purple-400">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2 dark:border-zinc-700">
                Account Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center mr-4 text-green-600 dark:text-green-400">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-medium flex items-center">
                      {user.enabled ? "Active" : "Inactive"}
                      {user.enabled && (
                        <span className="ml-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-10 w-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center mr-4 text-orange-600 dark:text-orange-400">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <div className="flex gap-2 mt-1">
                      {user.authorities.map((auth, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-semibold bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 rounded-md"
                        >
                          {auth.authority}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t dark:border-zinc-700 flex justify-end">
            <button
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
