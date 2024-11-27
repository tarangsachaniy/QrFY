import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";

export default async function Page({ params }) {
  // Connect to the database
  await connectToDatabase();

  const shorturl = params.shorturl;

  try {
    // Attempt to find and update the URL document
    const doc = await Url.findOneAndUpdate(
      { shorturl }, // Find by shorturl
      { $inc: { count: 1 } }, // Increment the count
      { new: true } // Return the updated document
    );

    // Check if the document exists
    if (doc) {
      // Redirect to the actual URL
      redirect(doc.url);
    } else {
      // If no document is found, redirect to a fallback page
      redirect(process.env.NEXT_PUBLIC_HOST || "/");
    }
  } catch (error) {
    console.error("Error fetching or updating URL:", error);
    // Redirect to a fallback page in case of an error
    redirect(process.env.NEXT_PUBLIC_HOST || "/");
  }

  return null; // Return null as no UI is rendered
}
