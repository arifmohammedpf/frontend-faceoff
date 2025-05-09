import { Metadata } from "next";
import Link from "next/link";
import { getAccessToken } from "@/lib/getAccessToken";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon, TagIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function fetchEventDetails(id: string) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${process.env.API_BASE_URL}/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch event details");
  }

  const event = await response.json();
  return event;
}

export default async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await fetchEventDetails(id);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" className="cursor-pointer">
            Back to Events
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold">{event.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none text-muted-foreground">
            <p>{event.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Start</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.begin_at), "MMMM dd, yyyy HH:mm")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">End</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.end_at), "MMMM dd, yyyy HH:mm")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Type</p>
                <p className="text-sm text-muted-foreground">{event.kind}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Capacity</p>
                <p className="text-sm text-muted-foreground">
                  {event.nbr_subscribers} / {event.max_people} registered
                </p>
              </div>
            </div>
          </div>
          
          {event.themes && event.themes.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium mb-2">Themes</p>
              <div className="flex flex-wrap gap-2">
                {event.themes.map((theme: any) => (
                  <span 
                    key={theme.id} 
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    {theme.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}