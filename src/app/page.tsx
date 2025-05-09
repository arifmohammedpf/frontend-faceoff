import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

async function fetchEvents(campusId: string | undefined) {
  return []
  if (!campusId) {
    throw new Error("Campus ID is not defined");
  }
  const response = await fetch(`${process.env.API_BASE_URL}/campus/${campusId}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
  const events = await fetchEvents(process.env.CAMPUS_ID);

  const now = new Date();
  const upcomingEvents = events?.filter((event: any) => new Date(event.begin_at) > now);
  const otherEvents = events?.filter((event: any) => new Date(event.begin_at) <= now);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">42 Events</h1>
        <p className="text-gray-600 mt-4">
          Discover and participate in amazing events happening around you.
        </p>
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents?.length > 0 ? 
            upcomingEvents.map((event: any) => (
            <Card key={event.id} className="shadow">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {format(new Date(event.begin_at), "MMMM dd, yyyy")}
                </p>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Card className="shadow text-center">
                <CardHeader>
                  <CardTitle>No Upcoming Events Available</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    There are currently no upcoming events to display. Please check back later.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Other Events Section */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherEvents?.length > 0 ? 
            otherEvents?.map((event: any) => (
            <Card key={event.id} className="shadow">
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {format(new Date(event.begin_at), "MMMM dd, yyyy")}
                </p>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
              <Card className="shadow text-center">
                <CardHeader>
                  <CardTitle>No Events Available</CardTitle>
                </CardHeader>
                <CardContent>
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
