import { fetchUser } from "@/lib/getUser";

export default async function AdminPanel() {
  const user = await fetchUser();
  if (!user) {
    return <div>Unauthorized</div>;
  }
  
  return <div>Admin Panel</div>
}