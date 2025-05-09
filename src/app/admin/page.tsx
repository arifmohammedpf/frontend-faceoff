import { fetchUser } from "@/lib/getUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default async function AdminPanel() {
  const user = await fetchUser();
  
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">Unauthorized</h1>
        <p className="text-muted-foreground">You don't have permission to access this page.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Event Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Manage all events from this dashboard.</p>
          <div className="flex flex-wrap gap-4">
            <Button>Create New Event</Button>
            <Button variant="outline">View All Events</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}