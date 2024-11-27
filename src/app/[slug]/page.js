import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const res = await fetch(`/api/slug/${params.slug}`, {
    method: "GET",
  });

  if (!res.ok) {
    return <h1>Slug not found</h1>;
  }

  const { url } = await res.json();

  // Redirect client to the original URL
  redirect(url);
}
