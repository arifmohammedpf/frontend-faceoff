import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchUser } from "@/lib/getUser";

export default async function Navbar() {
  const user = await fetchUser();
  const userName = user?.first_name;

  return (
    <header className="border-b bg-card">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-xl font-bold text-primary hover:text-primary/90 transition-colors">
          42 Event App
        </Link>
        <div className="flex items-center space-x-4">
          {userName && (
            <span className="text-muted-foreground">{`Welcome, ${userName}`}</span>
          )}
          <Link href="/admin">
            <Button variant="default" className="cursor-pointer">
              Admin Panel
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}