import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const { text, url } = body;

    // Validate URL
    if (!isValidUrl(url)) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid URL" }),
        { status: 400 }
      );
    }

    // Generate a random slug
    const slug = generateRandomSlug();

    // Save the URL with the slug
    const newUrl = await Url.create({ text, url, slug });

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

// Function to generate a random slug
function generateRandomSlug(length = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return slug;
}
