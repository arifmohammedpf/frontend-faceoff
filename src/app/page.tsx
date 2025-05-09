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
      <section className="text-center py-12 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">42 Events</h1>
        <p className="text-gray-600 mt-4">
          Discover and participate in amazing events happening around you.
        </p>
      </section>

      {/* Events Section */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event: any) => (
              <Link key={event.id} href={`/events/${event.id}`} className="block">
                <Card className="shadow hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">
                      {format(new Date(event.begin_at), "MMMM dd, yyyy")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Card className="shadow text-center h-full flex flex-col">
                <CardHeader>
                  <CardTitle>No Events Available</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">
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
