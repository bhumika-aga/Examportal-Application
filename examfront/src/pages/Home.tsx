import { BookOpen, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            The #1 Platform for Online Assessments
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Master Your Skills with <br />
            <span className="text-indigo-600">Smart Assessments</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Create, manage, and take quizzes with ease. Join thousands of students and educators
            utilizing our secure and intuitive exam portal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/register"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 font-semibold rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all"
            >
              Login to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="Secure & Reliable"
              description="Enterprise-grade security ensures your data and exams are always protected with JWT authentication."
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
              title="Diverse Categories"
              description="Access a wide range of quiz categories including Programming, Mathematics, Science, and more."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-600" />}
              title="User Friendly"
              description="Clean, responsive interface designed for the best testing experience across all devices."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ExamPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-zinc-900/50 rounded-2xl border border-gray-100 dark:border-zinc-800 hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-colors">
      <div className="h-14 w-14 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
