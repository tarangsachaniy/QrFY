// app/api/url/route.js
import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";


export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const { text, url } = body;

    
    if (!isValidUrl(url)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid URL" }),
        { status: 400 }
      );
    }

    const newUrl = await Url.create({ text, url });

    return new Response(JSON.stringify({ success: true, data: newUrl }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}

// Function to validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
