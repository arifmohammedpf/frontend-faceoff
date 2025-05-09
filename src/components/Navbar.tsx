import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-xl font-bold text-gray-800">
          Event Manager
        </Link>
        <div className="flex items-center space-x-4">
          {/* Placeholder for user info */}
          <span className="text-gray-600">Welcome, User</span>
          <Link href="/admin">
            <Button variant="default" className="cursor-pointer">Admin Panel</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}