import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import Url from "@/models/Url";

export default async function Page({ params }) {

  await connectToDatabase();

  const shorturl = params.shorturl;


  const doc = await Url.findOneAndUpdate(
    { shorturl },             
    { $inc: { count: 1 } },                  
  );

  if (doc) {

    redirect(doc.url);
  } else {

    redirect(process.env.NEXT_PUBLIC_HOST || "/");
  }

  return null;
}
