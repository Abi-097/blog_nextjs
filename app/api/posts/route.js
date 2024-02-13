import connectMongo from "@/utils/ConnectMongo";

import PostModel from "@/Models/postModel";

export async function GET() {
  try {
    await connectMongo();

    const PostData = await PostModel.find({});
    return Response.json(PostData);
  } catch (error) {
    return Response.json({ message: error.message });
  }
}
