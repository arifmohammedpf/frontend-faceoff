import Link from "next/link";
import { getAccessToken } from "@/lib/getAccessToken";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

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

export default async function EventDetails({ params }: { params: { id: string } }) {
  const event = await fetchEventDetails(params.id);

  return (
    <div className="container mx-auto py-12">
      <Link href="/">
        <Button variant="outline" className="mb-6 cursor-pointer">
          Go to Home
        </Button>
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{event.name}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>
      <div className="space-y-4">
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Type:</strong> {event.kind}
        </p>
        <p>
          <strong>Max People:</strong> {event.max_people}
        </p>
        <p>
          <strong>Subscribers:</strong> {event.nbr_subscribers}
        </p>
        <p>
          <strong>Start Date:</strong> {format(new Date(event.begin_at), "MMMM dd, yyyy HH:mm")}
        </p>
        <p>
          <strong>End Date:</strong> {format(new Date(event.end_at), "MMMM dd, yyyy HH:mm")}
        </p>
      </div>
    </div>
  );
}