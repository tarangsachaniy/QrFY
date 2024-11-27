// app/api/analytics/route.js

import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";

export async function GET() {
  // Connect to the database
  await connectToDatabase();

  try {
    const analyticsData = await Url.find({}, { text: 1 ,url : 1, slug: 1, count: 1 }); // Retrieve shorturl, url, and count
    return new Response(JSON.stringify(analyticsData), { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return new Response("Failed to fetch analytics data", { status: 500 });
  }
}
