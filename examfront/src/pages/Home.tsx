import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-8">Welcome to Exam Portal</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
