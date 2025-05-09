import { getAccessToken } from "./getAccessToken";

export async function fetchUser() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${process.env.API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  
  if (!response.ok) {
    return null;
  }

  const user = await response.json();
  return user;
}