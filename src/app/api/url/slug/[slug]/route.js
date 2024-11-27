
import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";

export async function GET(req, { params }) {
  await connectToDatabase();

  const { slug } = params;

  try {
    // Find the URL associated with the slug
    const urlData = await Url.findOne({ slug });

    if (!urlData) {
      return new Response(
        JSON.stringify({ success: false, message: "Slug not found" }),
        { status: 404 }
      );
    }

    urlData.count += 1;
    await urlData.save();

    return new Response(null, {
      status: 302,
      headers: {
        Location: urlData.url,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
    });
  }
}
