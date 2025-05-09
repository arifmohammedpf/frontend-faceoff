import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAccessToken } from "@/lib/getAccessToken";
import { format } from "date-fns";
import Link from "next/link";

async function fetchEvents() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${process.env.API_BASE_URL}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events = await response.json();
  return events;
}

export default async function Home() {
  const events = await fetchEvents();

  const now = new Date();

  // Sort events: upcoming events first, then past events
  const sortedEvents = events.sort((a: any, b: any) => {
    const dateA = new Date(a.begin_at);
    const dateB = new Date(b.begin_at);

    if (dateA > now && dateB > now) {
      return dateA.getTime() - dateB.getTime(); // Sort upcoming events by ascending date
    } else if (dateA <= now && dateB <= now) {
      return dateB.getTime() - dateA.getTime(); // Sort past events by descending date
    } else if (dateA > now && dateB <= now) {
      return -1; // Upcoming events come before past events
    } else {
      return 1; // Past events come after upcoming events
    }
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 rounded-xl bg-gradient-to-br from-blue-900/30 to-slate-900/40 border border-blue-800/20">
        <h1 className="text-4xl font-bold text-white">42 Events</h1>
        <p className="text-blue-200 mt-4 max-w-2xl mx-auto">
          Discover and participate in amazing events happening around you.
        </p>
      </section>

      {/* Events Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event: any) => (
              <Link key={event.id} href={`/events/${event.id}`} className="block">
                <Card className="hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <CardTitle>{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {format(new Date(event.begin_at), "MMMM dd, yyyy")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Card className="text-center h-full flex flex-col">
                <CardHeader>
                  <CardTitle>No Events Available</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    There are currently no events to display. Please check back later.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
